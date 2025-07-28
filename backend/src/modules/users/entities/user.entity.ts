import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Node } from '../../../common/interfaces/node.interface';

@ObjectType({ implements: [Node] })
export class User extends Node {
  // Internal database ID (not exposed in GraphQL)
  databaseId: number;

  @Field()
  username: string;

  @Field()
  email: string;

  // Don't expose password in GraphQL
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Follow relationships
  @Field(() => [User], { nullable: true })
  followers?: User[];

  @Field(() => [User], { nullable: true })
  following?: User[];

  @Field(() => Number)
  followersCount: number;

  @Field(() => Number)
  followingCount: number;

  @Field(() => Boolean)
  isFollowedByMe: boolean;
}