import { UsersNotificationPreference } from '../entities/users-notification-preference.entity';

export type CreateUsersNotificationPreference =
  Partial<UsersNotificationPreference>;

export type UpdateUsersNotificationPreference =
  Partial<UsersNotificationPreference> & {
    id: string;
  };
