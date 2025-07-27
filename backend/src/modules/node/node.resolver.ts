import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { Node } from '../../common/interfaces/node.interface';
import { extractDatabaseId, fromGlobalId } from '../../common/utils/id-utils';
import { UsersService } from '../users/users.service';

@Resolver(() => Node)
export class NodeResolver {
  constructor(
    private readonly usersService: UsersService,
    // Add other services as needed:
    // private readonly tweetsService: TweetsService,
  ) {}

  @Query(() => Node, { name: 'node', nullable: true })
  async getNode(@Args('id', { type: () => ID }) id: string): Promise<Node | null> {
    try {
      const { type, id: dbId } = fromGlobalId(id);
      const numericId = Number(dbId);
      
      switch (type) {
        case 'User': {
          const user = await this.usersService.findOne(numericId);
          return user as unknown as Node;
        }
        // Uncomment when TweetsService is available:
        // case 'Tweet': {
        //   const tweet = await this.tweetsService.findOne(numericId);
        //   return tweet as unknown as Node;
        // }
        default:
          return null;
      }
    } catch (error) {
      console.error('Error resolving node:', error);
      return null;
    }
  }
}