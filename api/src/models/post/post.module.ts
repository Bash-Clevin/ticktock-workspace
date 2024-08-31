import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [PostService, PostResolver, PrismaService],
})
export class PostModule {}
