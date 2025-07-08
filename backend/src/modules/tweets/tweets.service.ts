import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TweetsService {
  constructor(private readonly prisma: PrismaService) {}
  
  // Placeholder service - will be implemented in Milestone 2
}