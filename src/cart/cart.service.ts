import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: number) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    })

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: { items: { include: { product: true } } },
      })
    }

    return cart
  }

async addToCart(userId: number, productId: number, quantity: number) {
    let cart = await this.prisma.cart.findUnique({ where: { userId } })

    if (!cart) {
      console.log("Cart not found for user", userId, "creating new cart...")
      cart = await this.prisma.cart.create({
        data: { userId },
      })
      console.log("New cart created with id:", cart.id)
    }

    const existing = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    })

    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
        include: { product: true },
      })
    }

    return this.prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
      include: { product: true },
    })
  }

   async updateItem(cartItemId: number, quantity: number) {
    return this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
      include: { product: true },
    })
  }


 async removeItem(cartItemId: number) {
    return this.prisma.cartItem.delete({
      where: { id: cartItemId },
      include: { product: true },
    })
  }

  async clearCart(userId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } })
    if (!cart) throw new NotFoundException("Корзина не найдена")

    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } })

    return { success: true }
  }
}
