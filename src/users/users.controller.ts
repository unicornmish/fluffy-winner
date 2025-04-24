import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './users.service';


@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('find')
  findByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }
}   