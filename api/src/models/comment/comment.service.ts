import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Comment } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CommentCreateDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return await this.prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        User: true,
        Post: true,
      },
    });
  }

  async createComment(data: CommentCreateDto): Promise<Comment> {
    return await this.prisma.comment.create({
      data,
      include: {
        User: true,
        Post: true,
      },
    });
  }

  async deleteComment(commentId: number, userId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return new NotFoundException(
        `COmment with ID ${commentId} does not exist`,
      );
    }

    if (comment.userId !== userId) {
      throw new UnauthorizedException(
        'You do not have permission to delete this comment',
      );
    }

    return this.prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
