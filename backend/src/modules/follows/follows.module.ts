import { Module } from '@nestjs/common';
import { Follow } from './entities/follow.entity';
import { FollowsService } from './follows.service';
import { FollowsResolver } from './follows.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
  ],
  providers: [FollowsService, FollowsResolver],
  exports: [FollowsService],
})
export class FollowsModule {}