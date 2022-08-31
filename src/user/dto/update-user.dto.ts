import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsNotEmpty, IsInt } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: '更新ID不能为空' })
  @IsNumber()
  readonly userId: number;

  @IsInt({ message: 'useRole必须为整数' })
  readonly userRole: number;

  @IsInt({ message: 'status必须为整数' })
  readonly status: number;
}
