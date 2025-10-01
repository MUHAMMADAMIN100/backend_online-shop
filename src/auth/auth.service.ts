import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

   async register(email: string, password: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new BadRequestException('Пользователь уже существует');

    const role = email === 'admin@gmail.com' && password === 'admin' ? 'ADMIN' : 'USER';
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({ data: { email, password: hashedPassword, role } });

    const payload = { userId: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return { access_token, user };
  }

 async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('Неверный email или пароль');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Неверный email или пароль');

    const payload = { userId: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return { access_token, user };
  }

  async promoteToAdmin(userId: number, currentAdminId: number) {
    const currentAdmin = await this.prisma.user.findUnique({ where: { id: currentAdminId } });
    if (!currentAdmin || currentAdmin.role !== "ADMIN") {
      throw new UnauthorizedException("Только администратор может назначать нового администратора");
    }

    const userToPromote = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!userToPromote) throw new BadRequestException("Пользователь не найден");
    if (userToPromote.role === "ADMIN") throw new BadRequestException("Пользователь уже является администратором");

    // Транзакция для смены ролей
    const result = await this.prisma.$transaction(async (prisma) => {
      await prisma.user.update({ where: { id: currentAdminId }, data: { role: "USER" } });
      const newAdmin = await prisma.user.update({ where: { id: userId }, data: { role: "ADMIN" } });
      return newAdmin;
    });

    return { message: "Администратор успешно изменен", newAdmin: { id: result.id, email: result.email, role: result.role } };
  }

  async getCurrentAdmin() {
    const admin = await this.prisma.user.findFirst({
      where: { role: "ADMIN" },
      select: { id: true, email: true, role: true, createdAt: true },
    });
    if (!admin) throw new BadRequestException("Администратор не найден в системе");
    return admin;
  }

async validateAdminAccess(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== 'ADMIN') throw new BadRequestException('Нет доступа администратора');
    return true;
  }
}
