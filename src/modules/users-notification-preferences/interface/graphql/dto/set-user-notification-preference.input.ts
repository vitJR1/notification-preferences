import { Field, InputType } from '@nestjs/graphql';
import { NotificationChannel } from '../../../domain/types/notification-channel';
import { NotificationType } from '../../../domain/types/notification-type';
import { QuietHoursInput } from './quiet-hours.input';

@InputType()
export class SetUserNotificationPreferenceInput {
  @Field()
  userId: string;

  @Field(() => NotificationType)
  notificationType: NotificationType;

  @Field(() => NotificationChannel)
  channel: NotificationChannel;

  @Field()
  enabled: boolean;

  @Field(() => QuietHoursInput, { nullable: true })
  quietHours?: QuietHoursInput;
}
