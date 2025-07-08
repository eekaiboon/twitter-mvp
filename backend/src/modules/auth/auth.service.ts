import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserInput } from '../users/dto/create-user.dto';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './dto/auth-response.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(createUserInput: CreateUserInput): Promise<AuthPayload> {
    const user = await this.usersService.create(createUserInput);
    const token = this.generateToken(user);
    
    return {
      token,
      user,
    };
  }

  async login(loginInput: LoginInput): Promise<AuthPayload> {
    const user = await this.validateUser(loginInput.email, loginInput.password);
    const token = this.generateToken(user);
    
    return {
      token,
      user,
    };
  }

  private generateToken(user: any): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    return this.jwtService.sign(payload);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Remove password before returning
    const { password: _, ...result } = user;
    return result;
  }
}