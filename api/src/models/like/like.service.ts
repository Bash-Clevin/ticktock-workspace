import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async likePost(data: LikeDto) {
    return await this.prisma.like.create({ data });
  }

  async unLiKePost(postId: number, userId: number) {
    return await this.prisma.like.delete({
      where: { userId_postId: { postId, userId } },
    });
  }
}
