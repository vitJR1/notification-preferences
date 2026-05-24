import { Field, InputType } from '@nestjs/graphql';
import { NotificationChannel } from '../../../domain/types/notification-channel';
import { NotificationType } from '../../../domain/types/notification-type';
import { QuietHoursInput } from './quiet-hours.input';
import {
  IsBoolean,
  IsEnum,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class SetUserNotificationPreferenceInput {
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

  @Field(() => QuietHoursInput, { nullable: true })
  @ValidateNested()
  @Type(() => QuietHoursInput)
  quietHours?: QuietHoursInput;
}
