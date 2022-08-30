import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly userName: string;

  @IsNotEmpty({ message: '真实姓名不能为空' })
  readonly realName: string;

  @IsNotEmpty({ message: '手机号不能为空' })
  readonly mobile: string;

  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  // @IsNotEmpty({ message: '重复密码不能为空' })
  // @IsNumber()
  // readonly repassword: string;

  @IsNumber()
  readonly role?: number;
}
