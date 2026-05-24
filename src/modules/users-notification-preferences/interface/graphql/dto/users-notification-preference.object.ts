import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UsersNotificationPreferenceObject {
  @Field()
  id: string;
}
