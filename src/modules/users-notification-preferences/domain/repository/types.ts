import { UsersNotificationPreference } from '../entities/users-notification-preference.entity';
import { NotificationChannel } from '../types/notification-channel';
import { NotificationType } from '../types/notification-type';

export type PreferenceIdentity = {
  userId: string;
  notificationType: NotificationType;
  channel: NotificationChannel;
};

export type QuietHours = {
  quietHoursStart?: string | null;
  quietHoursEnd?: string | null;
  timezone?: string | null;
};

export type UpsertUsersNotificationPreference = PreferenceIdentity &
  QuietHours & {
    enabled: boolean;
  };

export type CreateUsersNotificationPreference =
  Partial<UsersNotificationPreference>;

export type UpdateUsersNotificationPreference =
  Partial<UsersNotificationPreference> & {
    id: string;
  };
