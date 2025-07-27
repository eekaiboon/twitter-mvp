import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { extractDatabaseId } from '../../common/utils/id-utils';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: createUserInput.username },
          { email: createUserInput.email },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === createUserInput.email) {
        throw new ConflictException('Email already in use');
      } else {
        throw new ConflictException('Username already in use');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        username: createUserInput.username,
        email: createUserInput.email,
        password: hashedPassword,
      },
    });
    
    // Map to User entity with proper typing
    return {
      ...user,
      databaseId: user.id
    } as unknown as User;
  }

  async findOne(id: number | string): Promise<User | null> {
    // Convert id to database ID format if needed
    const userId = typeof id === 'string' && isNaN(Number(id)) ? extractDatabaseId(id) : Number(id);
    
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    
    if (!user) {
      return null;
    }
    
    // Map to User entity with proper typing
    return {
      ...user,
      databaseId: user.id
    } as unknown as User;
  }

  async findByUsername(username: string, currentUserId?: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    
    if (!user) {
      return null;
    }
    
    let isFollowedByMe = false;
    
    // If currentUserId is provided, check if the current user follows this user
    if (currentUserId) {
      console.log(`Checking if user ${currentUserId} follows user ${user.id}`);
      
      const followRecord = await this.prisma.follow.findUnique({
        where: {
          followerId_followeeId: {
            followerId: currentUserId,
            followeeId: user.id
          }
        }
      });
      
      isFollowedByMe = !!followRecord;
      console.log(`Follow record found: ${isFollowedByMe}`);
    }
    
    // Map to User entity with proper typing
    return {
      ...user,
      databaseId: user.id,
      isFollowedByMe
    } as unknown as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      return null;
    }
    
    // Map to User entity with proper typing
    return {
      ...user,
      databaseId: user.id
    } as unknown as User;
  }
}