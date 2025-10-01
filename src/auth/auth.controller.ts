import { Controller, Post, Get, UseGuards, Body, Param, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { RolesGuard } from "./roles.guard";
import { Roles } from "./roles.decorator";
import { Role } from "@prisma/client";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @Post("login")
   @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    const result = await this.authService.login(body.email, body.password);
    return {
      ...result,
      redirectTo: result.user.role === "ADMIN" ? "/admin" : "/user",
    };
  }

  @Post("promote-to-admin/:userId")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async promoteToAdmin(@Param('userId') userId: string, @Req() req: any) {
    return this.authService.promoteToAdmin(Number(userId), req.user.userId);
  }

  @Get("admin")
  async getCurrentAdmin() {
    return this.authService.getCurrentAdmin();
  }

  @Get("validate-admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async validateAdmin(@Req() req: any) {
    return this.authService.validateAdminAccess(req.user.userId);
  }
}
