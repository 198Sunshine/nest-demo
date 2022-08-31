import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../utils/log4js';

@Catch(HttpException)
export class AnyExceptionFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    // 自定义的异常信息结构, 响应用
    const error_info = exception?.response || exception;
    const error_data = exception?.response?.data || {};
    const error_msg =
      exception?.response?.message || exception.response.errorMsg;
    const error_code =
      exception?.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

    // 自定义异常结构体, 日志用
    const errorLogFormat = {
      timestamp: new Date().toISOString(),
      IP: request.ip,
      reqUrl: request.originalUrl,
      reqMethod: request.method,
      httpCode: status,
      params: request.params,
      query: request.query,
      body: request.body,
      Response: exception.toString(),
      errorMsg: error_msg,
      statusCode: error_code,
      errorData: error_data,
      errorInfo: error_info,
    };
    if (status === HttpStatus.NOT_FOUND) {
      errorLogFormat.errorMsg = `资源不存在！接口 ${request.method} - ${request.url} 无效`;
    } else if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      errorLogFormat.errorMsg = `服务端异常`;
    }
    Logger.error(errorLogFormat);

    // 程序内异常捕获返回
    response.status(status).json({
      data: errorLogFormat.errorData,
      code: status,
      msg: errorLogFormat.errorMsg,
    });
  }
}
