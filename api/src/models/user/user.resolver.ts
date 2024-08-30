import { BadRequestException, UseFilters } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthService } from 'src/common/auth/auth.service';
import { LoginResponse, RegisterResponse } from 'src/common/auth/auth.types';
import { LoginDto, RegisterDto } from 'src/common/auth/dto/auth.dto';
import { GraphQLErrorFilter } from 'src/filters/custom-exception.filter';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseFilters(GraphQLErrorFilter)
  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ) {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException({
        confirmPassword: 'Passwords are not the same',
      });
    }

    const { user } = await this.authService.register(registerDto, context.res);
    return { user };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginDto: LoginDto,
    @Context() context: { res: Response },
  ) {
    return this.authService.login(loginDto, context.res);
  }

  @Mutation(() => String)
  async logout(@Context() context: { res: Response }) {
    return this.authService.logout(context.res);
  }

  @Mutation(() => String)
  async refreshToken(@Context() context: { req: Request; res: Response }) {
    try {
      return await this.authService.refreshToken(context.req, context.res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Query(() => String)
  async hello() {
    return 'hello world';
  }
}
