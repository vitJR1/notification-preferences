import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QuietHoursObject {
  @Field()
  start: string;

  @Field()
  end: string;

  @Field()
  timezone: string;
}
