import { CreateUsersNotificationPreferenceInput } from './create-users-notification-preference.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateUsersNotificationPreferenceInput extends PartialType(
  CreateUsersNotificationPreferenceInput,
) {
  @Field()
  @IsUUID()
  id: string;
}
