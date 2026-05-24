import { registerEnumType } from '@nestjs/graphql';

export enum EvaluationDecision {
  ALLOW = 'allow',
  DENY = 'deny',
}

registerEnumType(EvaluationDecision, {
  name: 'EvaluationDecision',
});
