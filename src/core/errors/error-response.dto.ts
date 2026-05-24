import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ErrorResponseDto {
  @Field(() => Int)
  statusCode: number;

  @Field({ description: 'Main form not found in section' })
  message: string;

  @Field({ description: 'CODE_FOR_LOCALIZATION' })
  code: string;
}
