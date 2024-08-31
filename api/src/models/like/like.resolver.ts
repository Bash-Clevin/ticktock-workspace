import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLAuthGuard } from 'src/common/auth/graphql-auth.guard';
import { LikeService } from './like.service';
import { Like } from './entity/like.entity';
import { Request } from 'express';

@UseGuards(GraphQLAuthGuard)
@Resolver()
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => Like)
  async likePost(
    @Args('postId') postId: number,
    @Context() ctx: { req: Request },
  ) {
    return await this.likeService.likePost({
      userId: ctx.req.user.sub,
      postId: postId,
    });
  }

  @Mutation(() => Like)
  async unLikePost(
    @Args('postId') postId: number,
    @Context() ctx: { req: Request },
  ) {
    return await this.likeService.unLiKePost(postId, ctx.req.user.sub);
  }
}
