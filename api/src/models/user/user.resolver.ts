import { BadRequestException, UseFilters, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthService } from 'src/common/auth/auth.service';
import {
  LoginResponse,
  RegisterResponse,
  UserResponseStrict,
} from 'src/common/auth/auth.types';
import { LoginDto, RegisterDto } from 'src/common/auth/dto/auth.dto';
import { GraphQLErrorFilter } from 'src/filters/custom-exception.filter';
import { UserService } from './user.service';
import { GraphQLAuthGuard } from 'src/common/auth/graphql-auth.guard';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { createWriteStream } from 'fs';

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

  @Query(() => [UserResponseStrict])
  async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => UserResponseStrict)
  async updatedUserProfile(
    @Context() context: { req: Request },
    @Args('name', { type: () => String, nullable: true }) name?: string,
    @Args('bio', { type: () => String, nullable: true }) bio?: string,
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    image?: GraphQLUpload,
  ) {
    let imageUrl;
    if (image) await this.storeImageAndGetUrl(image);

    return this.userService.updateProfile(context.req.user.sub, {
      name,
      bio,
      image: imageUrl,
    });
  }

  @Query(() => String)
  async hello() {
    return 'hello world';
  }

  private async storeImageAndGetUrl(file: GraphQLUpload): Promise<string> {
    const { createReadStream, filename } = await file;

    const uniqueFilename = `${uuidv4()}_${filename}`;
    const imagePath = join(process.cwd(), 'public', uniqueFilename);
    const imageUrl = `${process.env.APP_URL}/${uniqueFilename}`;
    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imagePath));

    return imageUrl;
  }
}
