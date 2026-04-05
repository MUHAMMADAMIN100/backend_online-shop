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

  private sendTelegramNotification(text: string): void {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) {
      console.log('Telegram env vars not set, skipping notification');
      return;
    }
    const body = JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' });
    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${botToken}/sendMessage`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => console.log('Telegram response:', data));
    });
    req.on('error', e => console.error('Telegram notification failed:', e));
    req.write(body);
    req.end();
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
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product?.price || 0,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    // Отправляем уведомление в Telegram
    const total = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const itemLines = order.items
      .map(i => `• ${i.product?.name ?? 'Товар'} × ${i.quantity} — ${(i.price * i.quantity).toLocaleString('ru')} ₽`)
      .join('\n');

    const message = [
      `🛒 <b>Новый заказ #${order.id}</b>`,
      ``,
      customerName ? `👤 Клиент: ${customerName}` : '',
      phone        ? `📱 Телефон: ${phone}` : '',
      address      ? `📍 Адрес: ${address}` : '',
      ``,
      `📦 <b>Товары:</b>`,
      itemLines,
      ``,
      `💰 <b>Итого: ${total.toLocaleString('ru')} ₽</b>`,
    ].filter(l => l !== undefined).join('\n');

    this.sendTelegramNotification(message);

    return order;
  }

  async getOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
