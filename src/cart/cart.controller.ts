import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(Number(userId));
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  addToCart(@Req() req, @Body() body: { productId: number; quantity: number }) {
    console.log('=== addToCart called ===');
    console.log('userId:', req.user.userId);
    console.log('body:', body);
    return this.cartService.addToCart(req.user.userId, body.productId, body.quantity);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:cartItemId')
  updateItem(@Param('cartItemId') cartItemId: string, @Body() body: { quantity: number }) {
    return this.cartService.updateItem(Number(cartItemId), body.quantity);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:cartItemId')
  removeItem(@Param('cartItemId') cartItemId: string) {
    return this.cartService.removeItem(Number(cartItemId));
  }

  @UseGuards(JwtAuthGuard)
  @Delete('clear/:userId')
  clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(Number(userId));
  }
}
