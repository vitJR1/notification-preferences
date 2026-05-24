import { BusinessError } from './business-error';

export function createBusinessError(
  message: string,
  statusCode: number,
  code: string,
) {
  abstract class CustomBusinessError extends BusinessError {
    static readonly STATUS = statusCode;
    static readonly CODE = code;
    static readonly MESSAGE = message;

    protected constructor() {
      super(
        CustomBusinessError.MESSAGE,
        CustomBusinessError.STATUS,
        CustomBusinessError.CODE,
      );
    }
  }
  return CustomBusinessError;
}
