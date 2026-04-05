import { Controller, Post, Get, Req, Body, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(
    @Req() req,
    @Body() body: { customerName?: string; phone?: string; address?: string; items?: any[] },
  ) {
    return this.orderService.createOrder(req.user.userId, {
      customerName: body?.customerName,
      phone: body?.phone,
      address: body?.address,
      items: body?.items,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrders(@Req() req) {
    return this.orderService.getOrders(req.user.userId);
  }
}
