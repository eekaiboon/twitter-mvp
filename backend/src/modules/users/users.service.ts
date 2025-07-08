import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/create-user.dto';
import { User } from './entities/user.entity';

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

  async findOne(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
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

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
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