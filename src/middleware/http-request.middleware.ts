import { Request, Response } from 'express';
import { Logger } from '../utils/log4js';

export const HttpRequestMiddleware = (
  req: Request,
  res: Response,
  next: () => void,
) => {
  const code = res.statusCode; // 响应状态码
  next();

  // 组装日志信息
  const logFormat = {
    httpType: 'Request',
    ip: req.headers?.remoteip
      ? String(req.headers.remoteip)
      : req.ip.split(':').pop(),
    reqUrl: `${req.headers.host}${req.originalUrl}`,
    reqMethod: req.method,
    httpCode: code,
    params: req.params,
    query: req.query,
    body: req.body,
  };
  if (code >= 500) {
    Logger.error(JSON.stringify(logFormat));
  } else if (code >= 400) {
    Logger.warn(JSON.stringify(logFormat));
  } else {
    Logger.access(JSON.stringify(logFormat));
    Logger.log(JSON.stringify(logFormat));
  }
};
