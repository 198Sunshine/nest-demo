import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [HomeModule, TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:'5432',
    username:'postgres',
    password:'yp199822',
    database:'postgres',
    autoLoadEntities:true,
    synchronize:true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
