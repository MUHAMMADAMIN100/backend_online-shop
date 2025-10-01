import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Param,
  Body,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdminGuard } from "./admin.guard";
import { AdminService } from "./admin.service";

@Controller("admin")
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("dashboard")
  async getDashboard() {
    return this.adminService.getDashboardStats();
  }

  @Get("users")
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get("users/:id")
  async getUserById(@Param("id") id: string) {
    return this.adminService.getUserById(Number(id));
  }

  @Put("users/:id/role")
  async updateUserRole(
    @Param("id") id: string,
    @Body() { role }: { role: "USER" | "ADMIN" },
  ) {
    return this.adminService.updateUserRole(Number(id), role);
  }

  @Delete("users/:id")
  async deleteUser(@Param("id") id: string) {
    return this.adminService.deleteUser(Number(id));
  }

  @Get("products")
  async getAllProducts() {
    return this.adminService.getAllProducts();
  }

  @Post("products")
  async createProduct(
    @Body() productData: { name: string; description?: string; price: number; category?: string; image?: string },
  ) {
    return this.adminService.createProduct(productData);
  }

  @Put("products/:id")
  async updateProduct(
    @Param("id") id: string,
    @Body() productData: { name?: string; description?: string; price?: number; category?: string; image?: string },
  ) {
    return this.adminService.updateProduct(Number(id), productData);
  }

  @Delete("products/:id")
  async deleteProduct(@Param("id") id: string) {
    return this.adminService.deleteProduct(Number(id));
  }

  @Get("orders")
  async getAllOrders() {
    return this.adminService.getAllOrders();
  }

  @Put("orders/:id/status")
  async updateOrderStatus(@Param("id") id: string, @Body() { status }: { status: string }) {
    return this.adminService.updateOrderStatus(Number(id), status);
  }
}
