import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Node } from '../../../common/interfaces/node.interface';

@ObjectType({ implements: [Node] })
export class Tweet extends Node {
  // Internal database ID (not exposed in GraphQL)
  databaseId: number;

  @Field()
  content: string;

  @Field()
  authorId: number;

  @Field(() => User)
  author: User;

  @Field(() => Int)
  likesCount: number;

  @Field(() => Int)
  retweetsCount: number;

  @Field(() => Int)
  repliesCount: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}