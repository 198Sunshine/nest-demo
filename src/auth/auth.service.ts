import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { encryptPassword } from '../utils/cryptogram';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,

    private readonly jwtService: JwtService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(username: string, password: string): Promise<any> {
    const user: any = await this.userRepository.find({
      account_name: username,
    });
    if (user[0]) {
      const { passwd, passwd_salt } = user[0];
      const hashPassword = encryptPassword(password, passwd_salt);
      if (passwd === hashPassword) {
        // 密码正确
        return {
          code: 1,
          user,
        };
      } else {
        return {
          code: 2,
          msg: '账号或密码错误',
        };
      }
    } else {
      return {
        code: 3,
        msg: '账号或密码错误',
      };
    }
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const { userName, userId, realName, role } = user;
    const payload = {
      userId,
      userName,
      realName,
      role,
    };
    try {
      const token = this.jwtService.sign(payload);
      return {
        code: 200,
        data: token,
        msg: `登录成功`,
      };
    } catch (err) {
      return {
        code: 401,
        msg: '账号或密码错误',
      };
    }
  }
}
