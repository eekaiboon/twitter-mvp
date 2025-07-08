import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }

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