import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { Response, Request } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/models/user/entity/user.entity';
import { LoginInputDto, RegisterInputDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
  private readonly refresh_cookie_name: string;
  private readonly access_cookie_name: string;

  private logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.refresh_cookie_name = 'tiktok_refresh_token';
    this.access_cookie_name = 'tiktok_access_token';
  }

  async refreshToken(req: Request, res: Response): Promise<string> {
    const refreshToken = req.cookies(this.refresh_cookie_name);

    if (!refreshToken) {
      this.logger.error('Missing refresh token');
      throw new UnauthorizedException('Refresh token not found');
    }

    let payload;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });

      const existingUser = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!existingUser) {
        throw new UnauthorizedException('Invalid token');
      }

      const expiresIn = 15000;
      const expiration = Math.floor(Date.now() / 1000) + expiresIn;
      const accessToken = this.jwtService.sign(
        { ...payload, exp: expiration },
        { secret: this.configService.get<string>('ACCESS_TOKEN_SECRET') },
      );

      res.cookie(this.access_cookie_name, accessToken, { httpOnly: true });
      return accessToken;
    } catch (err) {
      this.logger.error('Invalid or missing refresh token', err);
      throw new UnauthorizedException('Invalid Refresh token');
    }
  }

  private async issueTokens(user: User, response: Response) {
    const payload = { username: user.name, sub: user.id };
    const [accessToken, refreshtoken] = await Promise.all([
      this.jwtService.signAsync(
        { ...payload },
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: '10m',
        },
      ),
      this.jwtService.signAsync(
        { ...payload },
        {
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    response.cookie(this.access_cookie_name, accessToken, { httpOnly: true });
    response.cookie(this.refresh_cookie_name, refreshtoken, { httpOnly: true });
    return { user };
  }

  async validateUser(loginDto: LoginInputDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      return user;
    }
    return null;
  }

  async register(registerDto: RegisterInputDto, response: Response) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = bcrypt.hashSync(registerDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
      },
    });

    return this.issueTokens(user, response);
  }

  async login(loginDto: LoginInputDto, response: Response) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokens(user, response);
  }

  async logout(response: Response) {
    response.clearCookie(this.access_cookie_name);
    response.clearCookie(this.refresh_cookie_name);
    return 'Successfull logged out';
  }
}
