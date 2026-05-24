import { createBusinessError } from './create-business-error';

export class NotFoundError extends createBusinessError(
  'Entity not found',
  404,
  'ENTITY_NOT_FOUND',
) {
  constructor(entityName: string) {
    super();
    this.message = `${entityName} not found`;
    this.code = `${entityName.toUpperCase()}_NOT_FOUND`;
  }
}
