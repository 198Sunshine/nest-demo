import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DbLogger } from './utils/log4js';
import { CommodityModule } from './commodity/commodity.module';

@Module({
  imports: [
    /*
    * 参考文档:
      官方文档: https://typeorm.biunav.com/zh/logging.html#%E6%9B%B4%E6%94%B9%E9%BB%98%E8%AE%A4%E8%AE%B0%E5%BD%95%E5%99%A8
      https://blog.csdn.net/huzzzz/article/details/103191803/
    * */
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'yp199822',
      database: 'nest',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      logger: new DbLogger(), // 配置项添加自定义的log类
      timezone: '+08:00',
    }),
    AuthModule,
    UserModule,
    CommodityModule,
  ],
})
export class AppModule {}
