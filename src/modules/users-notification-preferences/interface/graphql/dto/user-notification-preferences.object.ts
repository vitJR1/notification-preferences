import { Field, ObjectType } from '@nestjs/graphql';
import { QuietHoursObject } from './quiet-hours.object';
import { UsersNotificationPreferenceObject } from './users-notification-preference.object';

@ObjectType()
export class UserNotificationPreferencesObject {
  @Field()
  userId: string;

  @Field(() => [UsersNotificationPreferenceObject])
  preferences: UsersNotificationPreferenceObject[];

  @Field(() => QuietHoursObject, { nullable: true })
  quietHours: QuietHoursObject | null;
}
