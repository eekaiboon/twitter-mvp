import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsResolver } from './tweets.resolver';

@Module({
  providers: [TweetsService, TweetsResolver],
  exports: [TweetsService],
})
export class TweetsModule {}