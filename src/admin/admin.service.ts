
import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [usersCount, productsCount, ordersCount, totalRevenue] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.product.count(),
      this.prisma.order.count(),
      this.prisma.orderItem.aggregate({ _sum: { price: true } }),
    ]);

    return {
      users: usersCount,
      products: productsCount,
      orders: ordersCount,
      revenue: totalRevenue._sum.price || 0,
    };
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, role: true, createdAt: true, _count: { select: { orders: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        orders: { include: { items: { include: { product: true } } } },
      },
    });
    if (!user) throw new NotFoundException("Пользователь не найден");
    return user;
  }

  async updateUserRole(id: number, role: "USER" | "ADMIN") {
    if (role === "ADMIN") {
      const existingAdmin = await this.prisma.user.findFirst({ where: { role: "ADMIN", id: { not: id } } });
      if (existingAdmin) throw new BadRequestException("В системе уже есть администратор");
    }
    return this.prisma.user.update({ where: { id }, data: { role }, select: { id: true, email: true, role: true } });
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException("Пользователь не найден");
    if (user.role === "ADMIN") throw new BadRequestException("Нельзя удалить администратора");
    await this.prisma.user.delete({ where: { id } });
    return { message: "Пользователь удален" };
  }

  async getAllProducts() {
    return this.prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  }

  async createProduct(productData: { name: string; description?: string; price: number; image?: string; category?: string }) {
    return this.prisma.product.create({ data: productData });
  }

  async updateProduct(id: number, productData: { name?: string; description?: string; price?: number; image?: string; category?: string }) {
    return this.prisma.product.update({ where: { id }, data: productData });
  }

  async deleteProduct(id: number) {
    await this.prisma.product.delete({ where: { id } });
    return { message: "Продукт удален" };
  }

  async getAllOrders() {
    return this.prisma.order.findMany({
      include: { user: { select: { id: true, email: true } }, items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateOrderStatus(id: number, status: string) {
    return { message: `Статус заказа ${id} обновлен на ${status}` };
  }

  async getAnalytics(period: string = 'allTime') {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    // Диапазон дат для фильтра графиков
    let periodStart: Date | undefined;
    let periodEnd: Date | undefined;
    if (period === 'thisMonth') {
      periodStart = startOfMonth;
    } else if (period === 'lastMonth') {
      periodStart = startOfLastMonth;
      periodEnd = endOfLastMonth;
    } else if (period === 'lastYear') {
      const y = now.getFullYear() - 1;
      periodStart = new Date(y, 0, 1);
      periodEnd = new Date(y, 11, 31, 23, 59, 59);
    } else if (period === 'thisYear') {
      periodStart = new Date(now.getFullYear(), 0, 1);
    }
    // allTime — без фильтра

    const orderItemsWhere = periodStart
      ? { order: { createdAt: { gte: periodStart, ...(periodEnd ? { lte: periodEnd } : {}) } } }
      : {};

    const [
      thisMonthOrders,
      lastMonthOrders,
      allOrderItems,
      allProducts,
      totalStats,
    ] = await Promise.all([
      this.prisma.order.findMany({
        where: { createdAt: { gte: startOfMonth } },
        include: { items: true },
      }),
      this.prisma.order.findMany({
        where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
        include: { items: true },
      }),
      this.prisma.orderItem.findMany({ where: orderItemsWhere, include: { product: true } }),
      this.prisma.product.findMany({ select: { id: true, name: true, stock: true } }),
      this.prisma.$transaction([
        this.prisma.user.count(),
        this.prisma.product.count(),
        this.prisma.order.count(),
        this.prisma.orderItem.aggregate({ _sum: { price: true } }),
      ]),
    ]);

    // Доход текущего месяца
    const thisMonthRevenue = thisMonthOrders.reduce(
      (sum, o) => sum + o.items.reduce((s, i) => s + i.price * i.quantity, 0), 0
    );
    const lastMonthRevenue = lastMonthOrders.reduce(
      (sum, o) => sum + o.items.reduce((s, i) => s + i.price * i.quantity, 0), 0
    );

    // Топ продаж
    const productSales: Record<number, { name: string; sold: number; revenue: number; stock: number }> = {};
    allOrderItems.forEach(item => {
      if (!item.productId) return;
      const product = allProducts.find(p => p.id === item.productId);
      if (!product) return;
      if (!productSales[item.productId]) {
        productSales[item.productId] = { name: product.name, sold: 0, revenue: 0, stock: product.stock ?? 0 };
      }
      productSales[item.productId].sold += item.quantity;
      productSales[item.productId].revenue += item.price * item.quantity;
    });

    const topProducts = Object.entries(productSales)
      .map(([id, v]) => ({ id: Number(id), ...v }))
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 7);

    // Критические остатки (<=10 шт)
    const stockAlerts = allProducts
      .filter(p => (p.stock ?? 0) <= 10)
      .sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0));

    return {
      thisMonth: { orders: thisMonthOrders.length, revenue: Math.round(thisMonthRevenue) },
      lastMonth: { orders: lastMonthOrders.length, revenue: Math.round(lastMonthRevenue) },
      topProducts,
      stockAlerts,
      totalStats: {
        users: totalStats[0],
        products: totalStats[1],
        orders: totalStats[2],
        revenue: Math.round(totalStats[3]._sum?.price ?? 0),
      },
    };
  }
}
