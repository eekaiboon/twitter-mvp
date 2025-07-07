import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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
    return this.prisma.user.create({
      data: {
        username: createUserInput.username,
        email: createUserInput.email,
        password: hashedPassword,
      },
    });
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}