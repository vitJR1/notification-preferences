import { NotificationChannel } from './types/notification-channel';
import { NotificationType } from './types/notification-type';

export type GlobalNotificationPolicy = {
  notificationType: NotificationType;
  channel: NotificationChannel;
  region: string;
  reason: string;
};

export const GLOBAL_NOTIFICATION_POLICIES: GlobalNotificationPolicy[] = [
  {
    notificationType: NotificationType.MARKETING_EMAIL,
    channel: NotificationChannel.EMAIL,
    region: 'EU',
    reason: 'blocked_by_global_policy',
  },
  {
    notificationType: NotificationType.MARKETING_SMS,
    channel: NotificationChannel.SMS,
    region: 'EU',
    reason: 'blocked_by_global_policy',
  },
];
