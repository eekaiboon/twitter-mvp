import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Node } from '../../../common/interfaces/node.interface';

@ObjectType({ implements: [Node] })
export class Follow implements Node {
  // Internal database ID (not exposed in GraphQL)
  databaseId: number;

  followerId: number;

  followeeId: number;

  @Field(() => User, { nullable: true })
  follower?: User;

  @Field(() => User, { nullable: true })
  followee?: User;

  @Field()
  createdAt: Date;
}