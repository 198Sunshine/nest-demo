import { Controller, Post, Body, Get, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../pipe/validation.pipe';

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

  @UsePipes(new ValidationPipe())
  @Post('create')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
