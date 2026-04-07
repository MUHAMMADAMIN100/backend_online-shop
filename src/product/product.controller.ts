import { Controller, Get, Post, Body, Param, Put, Delete, Query, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import { ProductService } from './product.service';

type ProductBody = {
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  colors?: any;
  sizes?: any;
  stock?: number;
};

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const dir = join(process.cwd(), 'uploads');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
      },
      filename: (req, file, cb) => {
        const ext = extname(file.originalname).toLowerCase();
        cb(null, `product-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (/image\/(jpeg|jpg|png|gif|webp)/.test(file.mimetype)) cb(null, true);
      else cb(new BadRequestException('Только изображения (jpg, png, webp, gif)'), false);
    },
    limits: { fileSize: 10 * 1024 * 1024 },
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 3000}`;
    return { url: `${backendUrl}/uploads/${file.filename}` };
  }

  @Post()
  async create(@Body() body: ProductBody) {
    return this.productService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<ProductBody>) {
    return this.productService.update(+id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
