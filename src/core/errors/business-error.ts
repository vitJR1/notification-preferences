export abstract class BusinessError extends Error {
  public readonly statusCode: number;
  public code: string;

  static readonly STATUS: number = 500;
  static readonly CODE: string = 'BUSINESS_ERROR';
  static readonly MESSAGE: string = 'An unexpected business error occurred';

  protected constructor(message: string, statusCode: number, code: string) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.name = new.target.name;
  }
}
