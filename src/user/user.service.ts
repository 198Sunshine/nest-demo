import {
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { makeSalt, encryptPassword } from '../utils/cryptogram';
import { log } from 'util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {}

  findAll() {
    const user = this.UserRepository.find();
    console.log(user);
    return {
      code: 200,
      data: user,
      msg: 'success',
    };
  }

  /**
   * 查询是否有该用户
   * @param query
   */
  async findOne(query: string | number) {
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

  async create(createUserDto: CreateUserDto) {
    const { userName, realName, password, mobile } = createUserDto || {};
    const { data }: any = await this.findOne(userName);
    if (data) {
      return {
        code: 400,
        msg: '用户名已存在',
      };
    } else {
      const salt = makeSalt(); // 制作密码盐
      const hashPwd = encryptPassword(password, salt); // 加密密码
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
          msg: '创建成功',
        };
      } catch (err) {
        throw err;
      }
    }
  }

  async delete(id: number) {
    try {
      const user = await this.UserRepository.findOne({ user_id: id });
      await this.UserRepository.remove(user);
      return {
        code: 200,
        msg: 'success',
      };
    } catch (err) {
      throw err;
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    try {
      const user: any = await this.UserRepository.findOne(updateUserDto.userId);
      const { userName, realName, password, mobile } = updateUserDto;

      const salt = makeSalt(); // 制作密码盐
      const hashPwd = encryptPassword(password, salt); // 加密密码
      const updateUser = await this.UserRepository.merge(user, {
        account_name: userName,
        real_name: realName,
        passwd: hashPwd,
        mobile: mobile,
        passwd_salt: salt,
        create_by: 0,
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
