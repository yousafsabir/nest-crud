import {
  Controller,
  Get,
  Req,
  Param,
  ParseIntPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { User as UserDocument } from '@prisma/client';

import { UserService } from 'user/user.service';
import { JwtGuard } from 'auth/guard';
import { User } from 'auth/decorator';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@User('user') user: UserDocument) {
    return user;
  }

  @Get(':id')
  getUser(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.getUser(id);
  }

  @Patch()
  updateUser() {}
}
