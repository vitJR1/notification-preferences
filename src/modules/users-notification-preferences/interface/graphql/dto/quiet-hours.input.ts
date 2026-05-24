import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class QuietHoursInput {
  @Field()
  start: string;

  @Field()
  end: string;

  @Field()
  timezone: string;
}
