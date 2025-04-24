import { Controller, Post, Body, Put, Delete, Param, Get, Query } from '@nestjs/common';
import { EventService } from './events.service';

@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  create(@Body() body: any) {
    return this.eventService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.eventService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.eventService.delete(id);
  }

  @Get()
  findAllByUser(@Query('email') email: string) {
    return this.eventService.findAllByUser(email);
  }
}