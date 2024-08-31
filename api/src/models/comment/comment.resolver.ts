import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './entity/comment.entity';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from 'src/common/auth/graphql-auth.guard';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comment])
  async getCommentByPostId(@Args('postId') postId: number) {
    return await this.commentService.getCommentsByPostId(postId);
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => Comment)
  async createComment(
    @Args('postId') postId: number,
    @Args('text') text: string,
    @Context() ctx: { req: Request },
  ) {
    return await this.commentService.createComment({
      text: text,
      postId: postId,
      userId: ctx.req.user.sub,
    });
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => Comment)
  deleteComment(@Args('id') id: number, @Context() ctx: { req: Request }) {
    return this.commentService.deleteComment(id, ctx.req.user.sub);
  }
}
