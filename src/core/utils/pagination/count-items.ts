import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CountItems {
  @Field(() => Int)
  count: number;
}
