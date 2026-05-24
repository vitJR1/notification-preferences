import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UsersNotificationPreference {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
