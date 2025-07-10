import { ObjectType, Field } from '@nestjs/graphql';
import { Tweet } from '../entities/tweet.entity';

@ObjectType()
export class TweetResponse {
  @Field(() => Tweet)
  tweet: Tweet;
}

@ObjectType()
export class TweetsResponse {
  @Field(() => [Tweet])
  tweets: Tweet[];
}