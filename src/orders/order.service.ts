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

  /** Отправляет сообщение одному получателю в Telegram */
  private sendToChat(botToken: string, chatId: string, text: string): Promise<{ ok: boolean; result?: any; description?: string }> {
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
            console.log(`[Telegram] chat_id=${chatId} response:`, JSON.stringify(parsed));
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

  /** Отправляет сообщение всем настроенным получателям */
  sendTelegramMessage(text: string): Promise<void> {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId1  = process.env.TELEGRAM_CHAT_ID;
    const chatId2  = process.env.TELEGRAM_CHAT_ID_2;

    console.log('[Telegram] BOT_TOKEN set:', !!botToken, '| CHAT_ID_1 set:', !!chatId1, '| CHAT_ID_2 set:', !!chatId2);

    if (!botToken || !chatId1) {
      console.warn('[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set');
      return Promise.resolve();
    }

    const recipients = [chatId1, chatId2].filter(Boolean) as string[];
    return Promise.all(
      recipients.map(id => this.sendToChat(botToken, id, text).catch(e =>
        console.error(`[Telegram] error sending to ${id}:`, e)
      ))
    ).then(() => undefined);
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

    // Уменьшаем остатки на складе
    await Promise.all(
      cart.items.map(item =>
        this.prisma.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        })
      )
    );

    // Уведомление в Telegram
    const total = order.items.reduce((s, i) => s + i.price * i.quantity, 0);

    // Собираем строки товаров с размером и цветом из cart.items
    const cartItemMap = new Map(cart.items.map(ci => [ci.productId, ci]));
    const itemLines = order.items.map((i) => {
      const cartItem = cartItemMap.get(i.productId ?? 0);
      const details: string[] = [];
      if (cartItem?.size)  details.push(`размер: ${cartItem.size}`);
      if (cartItem?.color) details.push(`цвет: ${cartItem.color}`);
      const detailStr = details.length ? ` (${details.join(', ')})` : '';
      return `• ${i.product?.name ?? 'Товар'}${detailStr} × ${i.quantity} — ${(i.price * i.quantity).toLocaleString('ru')} сом.`;
    }).join('\n');

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
      `💰 <b>Итого: ${total.toLocaleString('ru')} сом.</b>`,
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
