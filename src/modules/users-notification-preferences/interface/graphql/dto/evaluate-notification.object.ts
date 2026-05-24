import { Field, ObjectType } from '@nestjs/graphql';
import { EvaluationDecision } from '../../../domain/types/evaluation-decision';

@ObjectType()
export class EvaluateNotificationObject {
  @Field(() => EvaluationDecision)
  decision: EvaluationDecision;

  @Field()
  reason: string;
}
