import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOrCreate(email: string, name: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) return user;
    return this.prisma.user.create({ data: { email, name } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}