import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

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

  private async sendTelegramNotification(text: string): Promise<void> {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) return;
    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      });
    } catch (e) {
      console.error('Telegram notification failed:', e);
    }
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

    await this.sendTelegramNotification(message);

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
