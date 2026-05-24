import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { BusinessError } from './business-error';

@Catch(BusinessError)
export class BusinessErrorFilter implements ExceptionFilter {
  catch(exception: BusinessError, host: ArgumentsHost) {
    const type = host.getType();

    if (type === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

      response.status(exception.statusCode).json({
        statusCode: exception.statusCode,
        message: exception.message,
        code: exception.code,
      });
    }

    if (type === 'ws') {
      const ctx = host.switchToWs();
      ctx.getClient().emit('error', {
        statusCode: exception.statusCode,
        code: exception.code,
        message: exception.message,
      });
    }
  }
}
