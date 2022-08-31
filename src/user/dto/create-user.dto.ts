import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须为String类型' })
  readonly userName: string;

  @IsNotEmpty({ message: '真实姓名不能为空' })
  @IsString({ message: '真实姓名必须为String类型' })
  readonly realName: string;

  @IsNotEmpty({ message: '手机号不能为空' })
  readonly mobile: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须为String类型' })
  readonly password: string;

  readonly role?: number;
}
