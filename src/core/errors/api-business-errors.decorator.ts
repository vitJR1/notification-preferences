import { applyDecorators, SetMetadata } from '@nestjs/common';
import { Extensions } from '@nestjs/graphql';
import { BusinessError } from './business-error';

export const API_BUSINESS_ERRORS_METADATA = 'apiBusinessErrors';

export function ApiBusinessErrors(...errors: (typeof BusinessError)[]) {
  const businessErrors = errors.map((ErrorClass) => ({
    statusCode: ErrorClass.STATUS,
    message: ErrorClass.MESSAGE,
    code: ErrorClass.CODE,
  }));

  return applyDecorators(
    SetMetadata(API_BUSINESS_ERRORS_METADATA, businessErrors),
    Extensions({ businessErrors }),
  );
}
