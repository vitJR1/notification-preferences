import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUsersNotificationPreferenceInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
