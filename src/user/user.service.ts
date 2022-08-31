import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { makeSalt, encryptPassword } from '../utils/cryptogram';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly AuthService: AuthService,

    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    const user = await this.UserRepository.find();
    const newUser = user.map((item) => {
      const { user_id, account_name, real_name, user_status, role, mobile } =
        item;
      return {
        userId: user_id,
        userName: account_name,
        realName: real_name,
        userStatus: user_status,
        role,
        mobile,
      };
    });
    return {
      code: 200,
      data: newUser,
      msg: 'success',
    };
  }

  async findUser(query: string | number) {
    let queryStr;
    if (typeof +query === 'number' && !isNaN(+query)) {
      if (query <= 0) {
        return {
          code: 403,
          msg: '查询的id错误',
        };
      }
      queryStr = 'user_id';
    } else {
      queryStr = 'account_name';
    }
    try {
      const user: any = await this.UserRepository.find({ [queryStr]: query });
      if (user.length) {
        const { user_id, account_name, real_name, user_status } = user[0];
        return {
          code: 200,
          data: {
            userId: user_id,
            userName: account_name,
            realName: real_name,
            userStatus: user_status,
            role: user[0].role,
            mobile: user[0].mobile,
          },
          msg: 'success',
        };
      } else {
        return {
          code: 401,
          msg: '查无此人',
        };
      }
    } catch (err) {
      return {
        code: 500,
        msg: err,
      };
    }
  }

  async loginUser(loginParams): Promise<any> {
    const { username, password } = loginParams;
    const authResult = await this.AuthService.validateUser(username, password);
    switch (authResult.code) {
      case 1:
        return this.AuthService.certificate(authResult.user);
      default:
        return authResult;
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { userName, realName, password, mobile } = createUserDto || {};
    const { data }: any = await this.findUser(userName);
    if (data) {
      return {
        code: 400,
        msg: '用户名已存在',
      };
    }
    const salt = makeSalt();
    // 加密方式
    const hashPwd = encryptPassword(password, salt);
    try {
      const newUser = await this.UserRepository.create({
        account_name: userName,
        real_name: realName,
        passwd: hashPwd,
        passwd_salt: salt,
        mobile,
        user_status: 1,
        role: 3,
        create_by: 0,
      });
      await this.UserRepository.save(newUser);
      return {
        code: 200,
        msg: '新增成功',
      };
    } catch (err) {
      return {
        code: 500,
        msg: `${err}`,
      };
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.UserRepository.findOne({ user_id: id });
      if (!user)
        return {
          code: 401,
          msg: '查无此人',
        };
      await this.UserRepository.remove(user);
      return {
        code: 200,
        msg: 'success',
      };
    } catch (err) {
      throw err;
    }
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<any> {
    let hashPwd, salt;
    try {
      const user: any = await this.UserRepository.findOne({
        user_id: updateUserDto.userId,
      });
      if (!user)
        return {
          code: 401,
          msg: '查无此人',
        };
      const { userName, realName, password, mobile, userRole, status } =
        updateUserDto;
      const { passwd = '', passwd_salt = '', role, user_status } = user;
      // 如果更新了密码，则重新传递
      if (password) {
        salt = makeSalt(); // 制作密码盐
        hashPwd = encryptPassword(password, salt); // 加密密码
      }
      const updateUser = await this.UserRepository.merge(user, {
        account_name: userName,
        real_name: realName,
        passwd: hashPwd || passwd,
        passwd_salt: salt || passwd_salt,
        mobile,
        create_by: 0,
        role: userRole || role,
        user_status: status || user_status,
      });
      await this.UserRepository.save(updateUser);
      return {
        code: 200,
        msg: '更新成功',
      };
    } catch (err) {
      throw err;
    }
  }
}
