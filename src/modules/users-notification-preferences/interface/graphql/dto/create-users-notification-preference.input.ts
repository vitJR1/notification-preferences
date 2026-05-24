import { Field, InputType } from '@nestjs/graphql';
import { NotificationChannel } from '../../../domain/types/notification-channel';
import { NotificationType } from '../../../domain/types/notification-type';

@InputType()
export class CreateUsersNotificationPreferenceInput {
  @Field()
  userId: string;

  @Field(() => NotificationType)
  notificationType: NotificationType;

  @Field(() => NotificationChannel)
  channel: NotificationChannel;

  @Field()
  enabled: boolean;

  @Field({ nullable: true })
  quietHoursStart?: string;

  @Field({ nullable: true })
  quietHoursEnd?: string;

  @Field({ nullable: true })
  timezone?: string;
}
