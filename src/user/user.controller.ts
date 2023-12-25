import { UserService } from './user.service';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { EditUserDto } from './dto/edit-user.dto';
import { JwtGuard } from './../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private UserService: UserService) {}
  @Get('me')
  getMe(@GetUser('') user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    console.log(userId);
    console.log(dto);

    return this.UserService.editUser(userId, dto);
  }
}
