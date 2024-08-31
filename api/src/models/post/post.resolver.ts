import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { GraphQLAuthGuard } from 'src/common/auth/graphql-auth.guard';
import { Post, PostDetails } from './entity/post.entity';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => Post)
  async createPost(
    @Context() context: { req: Request },
    @Args({ name: 'video', type: () => GraphQLUpload }) video: any,
    @Args('text') text: string,
  ) {
    const userId = context.req.user.sub;
    const videoPath = await this.postService.saveVideo(video);
    const postData = {
      text,
      video: videoPath,
      User: { connect: { id: userId } },
    };
    return await this.postService.createPost(postData);
  }

  @Query(() => PostDetails)
  async getPostById(@Args('id') id: number) {
    return await this.postService.getPostById(id);
  }

  @Query(() => [Post])
  async getPosts(
    @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
    @Args('take', { type: () => Int, defaultValue: 1 }) take: number,
  ): Promise<Post[]> {
    return await this.postService.getPosts(skip, take);
  }

  @Query(() => [Post])
  async getPostsByUserId(@Args('userId') userId: number) {
    return await this.postService.getPostsByUserId(userId);
  }

  @Mutation(() => Post)
  async deletePost(@Args('id') id: number) {
    return await this.postService.deletePost(id);
  }
}
