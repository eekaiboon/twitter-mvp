import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { nodeId, toGlobalId, fromGlobalId } from '../../common/utils/relay.utils';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // Removed user(id) query in favor of the node query

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'userByUsername', nullable: true })
  async findByUsername(
    @Args('username') username: string,
    @CurrentUser() currentUser: User
  ): Promise<User | null> {
    console.log('userByUsername query called with currentUser:', currentUser ? 
      { id: currentUser.id, username: currentUser.username, databaseId: currentUser.databaseId } : null);
    
    // Pass the current user's databaseId to check if they follow the requested user
    return this.usersService.findByUsername(username, currentUser?.databaseId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'me' })
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}