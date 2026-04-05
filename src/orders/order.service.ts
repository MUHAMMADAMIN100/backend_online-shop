import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as https from 'https';

interface OrderItemInput {
  productId: number;
  quantity: number;
}

interface CreateOrderOptions {
  customerName?: string;
  phone?: string;
  address?: string;
  items?: OrderItemInput[];
}

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  /** Отправляет сообщение в Telegram и возвращает ответ API */
  sendTelegramMessage(text: string): Promise<{ ok: boolean; result?: any; description?: string }> {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId   = process.env.TELEGRAM_CHAT_ID;

    console.log('[Telegram] BOT_TOKEN set:', !!botToken, '| CHAT_ID set:', !!chatId);

    if (!botToken || !chatId) {
      const msg = 'TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set in environment';
      console.warn('[Telegram]', msg);
      return Promise.resolve({ ok: false, description: msg });
    }

    return new Promise((resolve) => {
      const body = JSON.stringify({ chat_id: Number(chatId), text, parse_mode: 'HTML' });
      const options = {
        hostname: 'api.telegram.org',
        path: `/bot${botToken}/sendMessage`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      };

      const req = https.request(options, (res) => {
        let raw = '';
        res.on('data', (chunk) => { raw += chunk; });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(raw);
            console.log('[Telegram] response:', JSON.stringify(parsed));
            resolve(parsed);
          } catch {
            console.error('[Telegram] invalid JSON:', raw);
            resolve({ ok: false, description: raw });
          }
        });
      });

      req.on('error', (err) => {
        console.error('[Telegram] request error:', err.message);
        resolve({ ok: false, description: err.message });
      });

      req.write(body);
      req.end();
    });
  }

  async createOrder(userId: number, options: CreateOrderOptions = {}) {
    const { customerName, phone, address } = options;

    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new NotFoundException('Корзина пуста');
    }

    const order = await this.prisma.order.create({
      data: {
        userId,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity:  item.quantity,
            price:     item.product?.price || 0,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    // Уведомление в Telegram
    const total     = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const itemLines = order.items
      .map((i) => `• ${i.product?.name ?? 'Товар'} × ${i.quantity} — ${(i.price * i.quantity).toLocaleString('ru')} ₽`)
      .join('\n');

    const message = [
      `🛒 <b>Новый заказ #${order.id}</b>`,
      '',
      customerName ? `👤 Клиент: ${customerName}` : null,
      phone        ? `📱 Телефон: ${phone}`        : null,
      address      ? `📍 Адрес: ${address}`        : null,
      '',
      `📦 <b>Товары:</b>`,
      itemLines,
      '',
      `💰 <b>Итого: ${total.toLocaleString('ru')} ₽</b>`,
    ].filter((l) => l !== null).join('\n');

    // Ждём результата — ошибка не должна прерывать ответ
    this.sendTelegramMessage(message).catch((e) =>
      console.error('[Telegram] unexpected error:', e),
    );

    return order;
  }

  async getOrders(userId: number) {
    return this.prisma.order.findMany({
      where:   { userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
