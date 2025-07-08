import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

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
}