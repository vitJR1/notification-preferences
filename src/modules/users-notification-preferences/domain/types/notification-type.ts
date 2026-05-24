import { registerEnumType } from '@nestjs/graphql';

export enum NotificationType {
  TRANSACTIONAL_EMAIL = 'transactional_email',
  TRANSACTIONAL_SMS = 'transactional_sms',
  TRANSACTIONAL_PUSH = 'transactional_push',
  MARKETING_EMAIL = 'marketing_email',
  MARKETING_SMS = 'marketing_sms',
  MARKETING_PUSH = 'marketing_push',
}

registerEnumType(NotificationType, {
  name: 'NotificationType',
});
