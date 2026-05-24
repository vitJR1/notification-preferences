import { Field, InputType } from '@nestjs/graphql';
import { IsISO8601, IsString } from 'class-validator';

@InputType()
export class QuietHoursInput {
  @Field()
  @IsISO8601()
  start: string;

  @Field()
  @IsISO8601()
  end: string;

  @Field()
  @IsString()
  timezone: string;
}
