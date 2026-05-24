import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;
}
