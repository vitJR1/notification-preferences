import { NotFoundError } from '../../../../core/errors/not-found.error';

export class UserNotFoundError extends NotFoundError {
  constructor() {
    super('User');
  }
}
