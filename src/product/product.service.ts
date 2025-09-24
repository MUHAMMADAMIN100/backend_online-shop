import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  // Получение всех продуктов с фильтрацией и поиском
  async findAll(filters?: { category?: string; minPrice?: number; maxPrice?: number; search?: string }) {
    let products = await this.prisma.product.findMany();

    if (filters?.category) {
      products = products.filter(p => p.category === filters.category);
    }

    if (filters?.minPrice != null) {
      const min = Number(filters.minPrice);
      products = products.filter(p => p.price >= min);
    }

    if (filters?.maxPrice != null) {
      const max = Number(filters.maxPrice);
      products = products.filter(p => p.price <= max);
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      products = products.filter(p => p.name.toLowerCase().includes(searchLower));
    }

    return products;
  }

  // Создание нового продукта
  async create(data: { name: string; description?: string; price: number; image?: string; category?: string }) {
    return this.prisma.product.create({ data });
  }

  // Получение одного продукта по ID
  async findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  // Редактирование продукта
  async update(
    id: number,
    data: { name?: string; description?: string; price?: number; image?: string; category?: string },
  ) {
    return this.prisma.product.update({ where: { id }, data });
  }

  // Удаление продукта
  async remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
