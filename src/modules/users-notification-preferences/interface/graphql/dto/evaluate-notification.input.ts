import { Field, InputType } from '@nestjs/graphql';
import { NotificationChannel } from '../../../domain/types/notification-channel';
import { NotificationType } from '../../../domain/types/notification-type';

@InputType()
export class EvaluateNotificationInput {
  @Field()
  userId: string;

  @Field(() => NotificationType)
  notificationType: NotificationType;

  @Field(() => NotificationChannel)
  channel: NotificationChannel;

  @Field()
  region: string;

  @Field()
  datetime: Date;
}
