import { Module } from '@nestjs/common';
import { EventModule } from './events/events.module';
import { UserModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UserModule, EventModule],
  providers: [PrismaService],
})
export class AppModule {}

