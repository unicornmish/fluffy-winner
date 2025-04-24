import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/users/users.service';


@Injectable()
export class EventService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(data: {
    title: string;
    description?: string;
    date: string;
    ownerEmail: string;
    invitedEmail?: string;
  }) {
    const owner = await this.userService.findOrCreate(data.ownerEmail, '');
    let invited;
    if (data.invitedEmail) {
      invited = await this.userService.findOrCreate(data.invitedEmail, '');
    }
    return this.prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        ownerId: owner.id,
        invitedId: invited?.id,
      },
    });
  }

  async update(id: string, updateData: any) {
    return this.prisma.event.update({ where: { id }, data: updateData });
  }

  async delete(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }

  async findAllByUser(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) return [];
    return this.prisma.event.findMany({
      where: {
        OR: [{ ownerId: user.id }, { invitedId: user.id }],
      },
      orderBy: { date: 'asc' },
    });
  }
}


// async update(id: string, updateData: any, userEmail: string) {
//     const user = await this.userService.findByEmail(userEmail);
//     const event = await this.prisma.event.findUnique({ where: { id } });
  
//     if (!event || event.ownerId !== user?.id) {
//       throw new Error('Você não tem permissão para editar este evento.');
//     }
  
//     return this.prisma.event.update({ where: { id }, data: updateData });
//   }
  
//   async delete(id: string, userEmail: string) {
//     const user = await this.userService.findByEmail(userEmail);
//     const event = await this.prisma.event.findUnique({ where: { id } });
  
//     if (!event || event.ownerId !== user?.id) {
//       throw new Error('Você não tem permissão para deletar este evento.');
//     }
  
//     return this.prisma.event.delete({ where: { id } });
//   }
  