import { Field, ObjectType } from '@nestjs/graphql';
import { CountItems } from '../../../../../core/utils/pagination/count-items';
import { UsersNotificationPreferenceObject } from './users-notification-preference.object';

@ObjectType()
export class PaginatedUsersNotificationPreferencesObject {
  @Field(() => [UsersNotificationPreferenceObject])
  items: UsersNotificationPreferenceObject[];

  @Field(() => CountItems)
  info: CountItems;
}
