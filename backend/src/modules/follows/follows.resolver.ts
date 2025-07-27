import { Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { FollowResult } from './dto/follow-result.dto';

@Resolver(() => User)
export class FollowsResolver {
  constructor(private readonly followsService: FollowsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => FollowResult)
  async followUser(
    @CurrentUser() currentUser: User,
    @Args('targetUserId') targetUserId: string,
  ): Promise<FollowResult> {
    return this.followsService.followUser(currentUser.databaseId, targetUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => FollowResult)
  async unfollowUser(
    @CurrentUser() currentUser: User,
    @Args('targetUserId') targetUserId: string,
  ): Promise<FollowResult> {
    return this.followsService.unfollowUser(currentUser.databaseId, targetUserId);
  }

  @ResolveField(() => [User])
  async followers(@Parent() user: User): Promise<User[]> {
    return this.followsService.getFollowers(user.databaseId);
  }

  @ResolveField(() => [User])
  async following(@Parent() user: User): Promise<User[]> {
    return this.followsService.getFollowing(user.databaseId);
  }

  @ResolveField(() => Number)
  async followersCount(@Parent() user: User): Promise<number> {
    return this.followsService.getFollowersCount(user.databaseId);
  }

  @ResolveField(() => Number)
  async followingCount(@Parent() user: User): Promise<number> {
    return this.followsService.getFollowingCount(user.databaseId);
  }

  @ResolveField(() => Boolean)
  async isFollowedByMe(
    @Parent() user: User,
    @CurrentUser() currentUser: User,
  ): Promise<boolean> {
    console.log('isFollowedByMe resolver called with:', { 
      user: { id: user.id, username: user.username, databaseId: user.databaseId },
      currentUser: currentUser ? { id: currentUser.id, username: currentUser.username, databaseId: currentUser.databaseId } : null 
    });
    
    if (!currentUser) {
      console.log('No current user found in isFollowedByMe resolver');
      return false;
    }
    
    const result = await this.followsService.isFollowing(currentUser.databaseId, user.databaseId);
    console.log(`User ${currentUser.username} is following ${user.username}: ${result}`);
    return result;
  }
}