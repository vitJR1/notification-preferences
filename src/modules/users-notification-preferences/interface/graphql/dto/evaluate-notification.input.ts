import { Field, InputType } from '@nestjs/graphql';
import { NotificationChannel } from '../../../domain/types/notification-channel';
import { NotificationType } from '../../../domain/types/notification-type';
import { IsDate, IsEnum, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class EvaluateNotificationInput {
  @Field()
  @IsUUID()
  userId: string;

  @Field(() => NotificationType)
  @IsEnum(NotificationType)
  notificationType: NotificationType;

  @Field(() => NotificationChannel)
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @Field()
  @IsString()
  region: string;

  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  datetime: Date;
}
