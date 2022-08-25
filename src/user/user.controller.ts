import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, DeleteUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':query')
  findOne(@Param('query') query: string | number) {
    return this.userService.findOne(query);
  }

  @Post('/create_user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/update_user')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Post('/delete_user')
  delete(@Body() deleteUserDto: DeleteUserDto) {
    return this.userService.delete(deleteUserDto.id);
  }
}
