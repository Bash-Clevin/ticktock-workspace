import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post as PostType, Prisma } from '@prisma/client';
import { createWriteStream, unlinkSync } from 'fs';
import { extname } from 'path';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreatePostDto } from './dto/post.dto';
import { Post, PostDetails } from './entity/post.entity';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async saveVideo(video: {
    createReadStream: () => any;
    filename: string;
    mimetype: string;
  }): Promise<string> {
    if (!video || !['video/mp4'].includes(video.mimetype)) {
      throw new BadRequestException(
        'Invalid video file format. Only MP4 is allowed',
      );
    }
    const videoName = `${Date.now()}${extname(video.filename)}`;
    const videoPath = `/files/${videoName}`;
    const stream = video.createReadStream();
    const outputPath = `public${videoPath}`;
    const writeStream = createWriteStream(outputPath);
    stream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    });

    return videoPath;
  }

  async createPost(data: Prisma.PostCreateInput): Promise<PostType> {
    return this.prisma.post.create({
      data: data,
    });
  }

  async getPostById(id: number): Promise<PostDetails> {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
        include: { User: true, Likes: true, Comments: true },
      });

      const postIds = await this.prisma.post.findMany({
        where: { userId: post.userId },
        select: { id: true },
      });

      return { ...post, otherPostIds: postIds.map((post) => post.id) };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async getPosts(skip: number, take: number): Promise<Post[]> {
    return await this.prisma.post.findMany({
      skip,
      take,
      include: { User: true, Likes: true, Comments: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPostsByUserId(userId: number): Promise<Post[]> {
    return await this.prisma.post.findMany({
      where: { userId },
      include: { User: true },
    });
  }

  async deletePost(id: number): Promise<void> {
    const post = await this.getPostById(id);

    try {
      unlinkSync(`public${post.video}`);
    } catch (err) {
      throw new NotFoundException(err.message);
    }

    await this.prisma.post.delete({ where: { id } });
  }
}
