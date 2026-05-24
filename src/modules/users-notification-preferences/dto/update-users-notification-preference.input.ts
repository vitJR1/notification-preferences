import { CreateUsersNotificationPreferenceInput } from './create-users-notification-preference.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUsersNotificationPreferenceInput extends PartialType(CreateUsersNotificationPreferenceInput) {
  @Field(() => Int)
  id: number;
}
