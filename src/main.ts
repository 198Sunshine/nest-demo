import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
import { HttpRequestMiddleware } from './middleware/http-request.middleware';
import { HttpResponseInterceptor } from './interceptor/http-response.interceptor';
import { AnyExceptionFilter } from './filter/any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*  用作处理请求参数
   *  express.json()
   * express.urlencoded({ extended: true })
   * */
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // // 监听所有的请求路由，并打印日志
  app.use(HttpRequestMiddleware);
  // // 使用全局拦截器打印出参
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  // 启用异常捕捉器
  app.useGlobalFilters(new AnyExceptionFilter());

  await app.listen(3000);
}
bootstrap();
