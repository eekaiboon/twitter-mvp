import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { TweetsService } from './tweets.service';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetInput } from './dto/create-tweet.dto';
import { GetUserTweetsArgs } from './dto/tweet-params.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { fromGlobalId } from '../../common/utils/relay.utils';

@Resolver(() => Tweet)
export class TweetsResolver {
  constructor(
    private readonly tweetsService: TweetsService,
    private readonly usersService: UsersService,
  ) {}
  
  @Mutation(() => Tweet)
  @UseGuards(JwtAuthGuard)
  async createTweet(
    @Args('input') createTweetInput: CreateTweetInput,
    @CurrentUser() user: User,
  ): Promise<Tweet> {
    return this.tweetsService.create(user.databaseId, createTweetInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Tweet])
  async getUserTweets(@Args() { userId }: GetUserTweetsArgs): Promise<Tweet[]> {
    return this.tweetsService.findAllByUser(userId);
  }

  @ResolveField('author', () => User)
  async getAuthor(@Parent() tweet: Tweet): Promise<User> {
    return this.usersService.findOne(tweet.authorId);
  }
  
  @ResolveField('likesCount', () => Number)
  getLikesCount(): number {
    // Placeholder for future implementation
    return 0;
  }
  
  @ResolveField('retweetsCount', () => Number)
  getRetweetsCount(): number {
    // Placeholder for future implementation
    return 0;
  }
  
  @ResolveField('repliesCount', () => Number)
  getRepliesCount(): number {
    // Placeholder for future implementation
    return 0;
  }
}