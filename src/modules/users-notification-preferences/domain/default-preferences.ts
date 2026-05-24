import { NotificationChannel } from './types/notification-channel';
import { NotificationType } from './types/notification-type';

export type DefaultNotificationPreference = {
  notificationType: NotificationType;
  channel: NotificationChannel;
  enabled: boolean;
};

export const DEFAULT_NOTIFICATION_PREFERENCES: DefaultNotificationPreference[] =
  [
    {
      notificationType: NotificationType.TRANSACTIONAL_EMAIL,
      channel: NotificationChannel.EMAIL,
      enabled: true,
    },
    {
      notificationType: NotificationType.TRANSACTIONAL_SMS,
      channel: NotificationChannel.SMS,
      enabled: true,
    },
    {
      notificationType: NotificationType.TRANSACTIONAL_PUSH,
      channel: NotificationChannel.PUSH,
      enabled: true,
    },
    {
      notificationType: NotificationType.MARKETING_EMAIL,
      channel: NotificationChannel.EMAIL,
      enabled: false,
    },
    {
      notificationType: NotificationType.MARKETING_SMS,
      channel: NotificationChannel.SMS,
      enabled: false,
    },
    {
      notificationType: NotificationType.MARKETING_PUSH,
      channel: NotificationChannel.PUSH,
      enabled: true,
    },
  ];
