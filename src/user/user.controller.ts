import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@UseGuards(AuthGuard('jwt')) // 开启token验证
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':query')
  findOne(@Param('query') query: string | number): any {
    return this.userService.findUser(query);
  }

  @UsePipes(new ValidationPipe())
  @Post('update')
  updateUser(@Body() user: UpdateUserDto) {
    return this.userService.updateUser(user);
  }

  @Post('delete')
  deleteUser(@Body() user: { userId: number }) {
    return this.userService.deleteUser(user.userId);
  }
}
