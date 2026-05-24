import { registerEnumType } from '@nestjs/graphql';

export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  MESSENGER = 'messenger',
  PUSH = 'push',
}

registerEnumType(NotificationChannel, {
  name: 'NotificationChannel',
});
