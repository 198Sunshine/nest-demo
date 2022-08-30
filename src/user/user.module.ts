import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserNoAuthController } from './userNoAuth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController, UserNoAuthController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
