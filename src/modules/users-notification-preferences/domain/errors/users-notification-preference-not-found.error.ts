import { NotFoundError } from '../../../../core/errors/not-found.error';

export class UsersNotificationPreferenceNotFoundError extends NotFoundError {
  constructor() {
    super('UsersNotificationPreference');
  }
}
