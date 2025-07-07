import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { CreateUserInput } from '../users/dto/create-user.dto';
import { AuthPayload } from './dto/auth-response.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async login(@Args('input') loginInput: LoginInput): Promise<AuthPayload> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthPayload)
  async signup(@Args('input') createUserInput: CreateUserInput): Promise<AuthPayload> {
    return this.authService.signup(createUserInput);
  }
}