import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 开启白名单，过滤掉多余的属性
      forbidNonWhitelisted: true, // 开启白名单剔除错误提示
      transform: true, //开启类型转换,对性能有轻微影响
    }),
  );
  await app.listen(3000);
}
bootstrap();
