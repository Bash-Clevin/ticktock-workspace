import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany({
      include: {
        Posts: true,
      },
    });
  }

  async updateProfile(
    userId: number,
    data: { name?: string; bio?: string; image?: string },
  ) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        bio: data.bio,
        image: data.image,
      },
    });
  }
}
