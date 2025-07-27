import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class FollowResult {
  @Field()
  success: boolean;

  @Field(() => User, { nullable: true })
  targetUser?: User;

  @Field({ nullable: true })
  error?: string;
}