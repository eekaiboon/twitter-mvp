import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { fromGlobalId } from '../../common/utils/relay.utils';

@Injectable()
export class FollowsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async followUser(currentUserId: number, targetUserGlobalId: string): Promise<{ success: boolean; targetUser: User; error?: string }> {
    // Convert global ID to database ID
    try {
      const [_, targetUserIdStr] = fromGlobalId(targetUserGlobalId);
      const targetUserId = parseInt(targetUserIdStr, 10);
      
      if (isNaN(targetUserId)) {
        throw new Error(`Invalid user ID: ${targetUserIdStr}`);
      }

      // Check if user exists
      const targetUser = await this.usersService.findOne(targetUserId);
      if (!targetUser) {
        throw new NotFoundException('User not found');
      }

        // Cannot follow yourself
      if (currentUserId === targetUserId) {
        throw new ForbiddenException('You cannot follow yourself');
      }

      // Check if already following
      const existingFollow = await this.prisma.follow.findUnique({
        where: {
          followerId_followeeId: {
            followerId: currentUserId,
            followeeId: targetUserId,
          },
        },
      });

      if (existingFollow) {
        throw new ConflictException('You are already following this user');
      }

      // Create follow relationship
      await this.prisma.follow.create({
        data: {
          followerId: currentUserId,
          followeeId: targetUserId,
        },
      });

      return {
        success: true,
        targetUser,
      };
    } catch (error) {
      console.error('Error in followUser:', error);
      return {
        success: false,
        targetUser: null,
        error: error.message || 'Failed to follow user',
      };
    }
  }

  async unfollowUser(currentUserId: number, targetUserGlobalId: string): Promise<{ success: boolean; targetUser: User; error?: string }> {
    // Convert global ID to database ID
    try {
      const [_, targetUserIdStr] = fromGlobalId(targetUserGlobalId);
      const targetUserId = parseInt(targetUserIdStr, 10);
      
      if (isNaN(targetUserId)) {
        throw new Error(`Invalid user ID: ${targetUserIdStr}`);
      }

      // Check if user exists
      const targetUser = await this.usersService.findOne(targetUserId);
      if (!targetUser) {
        throw new NotFoundException('User not found');
      }

      // Check if follow relationship exists
      const existingFollow = await this.prisma.follow.findUnique({
        where: {
          followerId_followeeId: {
            followerId: currentUserId,
            followeeId: targetUserId,
          },
        },
      });

      if (!existingFollow) {
        throw new NotFoundException('You are not following this user');
      }

      // Delete follow relationship
      await this.prisma.follow.delete({
        where: {
          followerId_followeeId: {
            followerId: currentUserId,
            followeeId: targetUserId,
          },
        },
      });

      return {
        success: true,
        targetUser,
      };
    } catch (error) {
      console.error('Error in unfollowUser:', error);
      return {
        success: false,
        targetUser: null,
        error: error.message || 'Failed to unfollow user',
      };
    }
  }

  async getFollowers(userId: number): Promise<User[]> {
    const followers = await this.prisma.follow.findMany({
      where: {
        followeeId: userId,
      },
      include: {
        follower: true,
      },
    });

    return followers.map(follow => ({
      ...follow.follower,
      databaseId: follow.follower.id,
    })) as unknown as User[];
  }

  async getFollowing(userId: number): Promise<User[]> {
    const following = await this.prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      include: {
        followee: true,
      },
    });

    return following.map(follow => ({
      ...follow.followee,
      databaseId: follow.followee.id,
    })) as unknown as User[];
  }

  async getFollowersCount(userId: number): Promise<number> {
    return this.prisma.follow.count({
      where: {
        followeeId: userId,
      },
    });
  }

  async getFollowingCount(userId: number): Promise<number> {
    return this.prisma.follow.count({
      where: {
        followerId: userId,
      },
    });
  }

  async isFollowing(followerId: number, followeeId: number): Promise<boolean> {
    console.log(`Checking if user ${followerId} is following user ${followeeId}`);
    
    try {
      const follow = await this.prisma.follow.findUnique({
        where: {
          followerId_followeeId: {
            followerId,
            followeeId,
          },
        },
      });
      
      console.log(`Follow record for ${followerId} -> ${followeeId}: `, follow);
      return !!follow;
    } catch (error) {
      console.error('Error checking follow status:', error);
      return false;
    }
  }
}