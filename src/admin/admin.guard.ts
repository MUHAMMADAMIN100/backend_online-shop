import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) {
      throw new UnauthorizedException("Пользователь не аутентифицирован")
    }

    // Проверка роли в базе
    const currentUser = await this.prisma.user.findUnique({
      where: { id: user.userId },
    })

    if (!currentUser || currentUser.role !== "ADMIN") {
      throw new UnauthorizedException("Доступ запрещен. Требуются права администратора")
    }

    return true
  }
}
