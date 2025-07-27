import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Node } from '../../../common/interfaces/node.interface';
import { toGlobalId } from '../../../common/utils/relay.utils';

@ObjectType({ implements: [Node] })
export class User implements Node {
  // Internal database ID (not exposed in GraphQL)
  databaseId: number;
  
  // Global Relay ID
  @Field(() => ID)
  get id(): string {
    return toGlobalId('User', this.databaseId);
  }

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