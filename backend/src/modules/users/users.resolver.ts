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

  @Query(() => User, { name: 'userByUsername', nullable: true })
  async findByUsername(@Args('username') username: string): Promise<User | null> {
    return this.usersService.findByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'me' })
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}