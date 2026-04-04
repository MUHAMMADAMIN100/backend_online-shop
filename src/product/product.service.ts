import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

type ProductData = {
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  colors?: any;
  sizes?: any;
  stock?: number;
};

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

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

  async create(data: ProductData) {
    return this.prisma.product.create({ data });
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<ProductData>) {
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
