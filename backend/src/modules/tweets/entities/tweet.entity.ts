import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Node } from '../../../common/interfaces/node.interface';
import { toGlobalId } from '../../../common/utils/relay.utils';

@ObjectType({ implements: [Node] })
export class Tweet implements Node {
  // Internal database ID (not exposed in GraphQL)
  databaseId: number;
  
  // Global Relay ID
  @Field(() => ID)
  get id(): string {
    return toGlobalId('Tweet', this.databaseId);
  }

  @Field()
  content: string;

  @Field()
  authorId: number;

  @Field(() => User)
  author: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}