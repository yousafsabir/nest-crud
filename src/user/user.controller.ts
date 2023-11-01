import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from 'user/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  @UseGuards(AuthGuard("jwt"))
  getMe() {
    return this.userService.getUser(1);
  }


  @Get(':id')
  getUser(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.getUser(1);
  }
}
