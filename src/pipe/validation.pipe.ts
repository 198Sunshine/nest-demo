import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Logger } from '../utils/log4js';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      // 如果没有传入验证规则，则不验证，直接返回数据
      return value;
    }
    // 将对象转换为 Class 来验证
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorMsg = [];
      errors.forEach((item) => {
        errorMsg.push(Object.values(item.constraints)[0]);
      });
      // Logger.error(`Validation failed: ${errorMsg.join(',')}`);
      throw new BadRequestException(`参数错误: ${errorMsg.join(',')}`);
    }
    return value;
  }

  // 验证类型
  private toValidate(metaType: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metaType);
  }
}
