import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetUserTweetsArgs {
  @Field(() => ID)
  @IsNotEmpty()
  userId: string;
}