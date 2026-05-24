import { CreateUsersNotificationPreferenceInput } from './create-users-notification-preference.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUsersNotificationPreferenceInput extends PartialType(
  CreateUsersNotificationPreferenceInput,
) {
  @Field()
  id: string;
}
