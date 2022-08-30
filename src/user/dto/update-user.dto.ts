import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @IsNotEmpty({message:"更新ID不能为空"})
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly userRole: number;

  @IsNumber()
  readonly status: number;
}
