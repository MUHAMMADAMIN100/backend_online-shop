import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Получение всех продуктов с фильтрацией и поиском
  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('search') search?: string,
  ) {
    const filters: any = {};
    if (category) filters.category = category;
    if (minPrice) filters.minPrice = Number(minPrice);
    if (maxPrice) filters.maxPrice = Number(maxPrice);
    if (search) filters.search = search;

    return this.productService.findAll(filters);
  }

  // Создание нового продукта
  @Post()
  async create(
    @Body() body: { name: string; description?: string; price: number; image?: string; category?: string },
  ) {
    return this.productService.create(body);
  }

  // Получение одного продукта по ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  // Редактирование продукта
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; description?: string; price?: number; image?: string; category?: string },
  ) {
    return this.productService.update(+id, body);
  }

  // Удаление продукта
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
