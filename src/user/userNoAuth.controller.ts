import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserNoAuthController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): any {
    return this.userService.findAll();
  }

  @Post('login')
  loginUser(@Body() loginParams) {
    return this.userService.loginUser(loginParams);
  }
}
