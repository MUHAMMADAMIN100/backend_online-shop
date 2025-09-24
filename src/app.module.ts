import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { AuthModule } from './auth/auth.module'; 
import { OrderController } from './orders/order.controller';
import { OrderService } from './orders/order.service';

@Module({
  imports: [AuthModule], 
  controllers: [ProductController, CartController,OrderController],
  providers: [PrismaService, ProductService, CartService,OrderService],
})
export class AppModule {}
