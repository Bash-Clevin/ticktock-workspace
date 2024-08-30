import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, JwtService, ConfigService],
  exports: [AuthService],
})
export class AuthModule {}
