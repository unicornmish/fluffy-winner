import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/users.module';
import { EventController } from './events.controller';
import { EventService } from './events.service';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  imports: [UserModule],
  controllers: [EventController],
  providers: [EventService, PrismaService],
})
export class EventModule {}