
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
}
