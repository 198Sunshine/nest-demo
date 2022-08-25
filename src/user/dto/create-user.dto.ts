import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly userName: string;

  @IsString()
  readonly realName: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly mobile: string;
}

export class DeleteUserDto {
  @IsNumber()
  readonly id: number;
}
