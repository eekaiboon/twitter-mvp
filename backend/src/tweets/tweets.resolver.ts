import { Resolver } from '@nestjs/graphql';
import { TweetsService } from './tweets.service';
import { Tweet } from './entities/tweet.entity';

@Resolver(() => Tweet)
export class TweetsResolver {
  constructor(private readonly tweetsService: TweetsService) {}
  
  // Placeholder resolver - will be implemented in Milestone 2
}