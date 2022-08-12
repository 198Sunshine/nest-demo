import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from './entities/home.entity';
import { Desc } from './entities/desc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Home, Desc])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
