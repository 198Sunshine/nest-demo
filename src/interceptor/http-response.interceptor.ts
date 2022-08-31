import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Logger } from '../utils/log4js';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    return next.handle().pipe(
      map((data) => {
        const logFormat = {
          httpType: 'Response',
          ip: req.headers?.remoteip
            ? String(req.headers.remoteip)
            : req.ip.split(':').pop(),
          reqUrl: `${req.headers.host}${req.originalUrl}`,
          reqMethod: req.method,
          httpCode: req.statusCode,
          params: req.params,
          query: req.query,
          body: req.body,
          data: data,
        };
        Logger.access(logFormat);
        Logger.info(logFormat);
        return data;
      }),
    );
  }
}
