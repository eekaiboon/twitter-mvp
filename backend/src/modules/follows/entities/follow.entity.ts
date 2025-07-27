import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Follow {
  id: number;

  followerId: number;

  followeeId: number;

  @Field(() => User, { nullable: true })
  follower?: User;

  @Field(() => User, { nullable: true })
  followee?: User;

  @Field()
  createdAt: Date;
}