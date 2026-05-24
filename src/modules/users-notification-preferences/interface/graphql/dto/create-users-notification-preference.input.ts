import { Field, InputType } from '@nestjs/graphql';
import { NotificationChannel } from '../../../domain/types/notification-channel';
import { NotificationType } from '../../../domain/types/notification-type';
import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateUsersNotificationPreferenceInput {
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
  @IsBoolean()
  enabled: boolean;

  @Field({ nullable: true })
  @IsISO8601()
  quietHoursStart?: string;

  @Field({ nullable: true })
  @IsISO8601()
  quietHoursEnd?: string;

  @Field({ nullable: true })
  @IsString()
  timezone?: string;
}
