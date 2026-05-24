import { Field, ObjectType } from '@nestjs/graphql';
import { UserObject } from './user.object';
import { CountItems } from '../../../../../core/utils/pagination/count-items';

@ObjectType()
export class PaginatedUsersObject {
  @Field(() => [UserObject])
  items: UserObject[];

  @Field(() => CountItems)
  info: CountItems;
}
