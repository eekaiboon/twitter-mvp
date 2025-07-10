import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTweetInput } from './dto/create-tweet.dto';
import { fromGlobalId } from '../../common/utils/relay.utils';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetsService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(userId: number, createTweetInput: CreateTweetInput): Promise<Tweet> {
    const tweet = await this.prisma.tweet.create({
      data: {
        content: createTweetInput.content,
        authorId: userId,
      },
      include: {
        author: true,
      },
    });

    return this.mapTweetToEntity(tweet);
  }

  async findAllByUser(userGlobalId: string): Promise<Tweet[]> {
    const [type, userIdStr] = fromGlobalId(userGlobalId);
    
    if (type !== 'User') {
      throw new NotFoundException(`Invalid user ID format`);
    }
    
    const userId = parseInt(userIdStr, 10);
    
    const tweets = await this.prisma.tweet.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
      },
    });

    return tweets.map(tweet => this.mapTweetToEntity(tweet));
  }

  async findOneById(id: number): Promise<Tweet> {
    const tweet = await this.prisma.tweet.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    if (!tweet) {
      throw new NotFoundException(`Tweet with ID ${id} not found`);
    }

    return this.mapTweetToEntity(tweet);
  }

  private mapTweetToEntity(tweet: any): Tweet {
    const entity = new Tweet();
    entity.databaseId = tweet.id;
    entity.content = tweet.content;
    entity.authorId = tweet.authorId;
    entity.author = tweet.author;
    entity.createdAt = tweet.createdAt;
    entity.updatedAt = tweet.updatedAt;
    
    return entity;
  }
}