import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CommentCreateDto {
  @Field()
  text: string;

  @Field(() => Int)
  postId: number;

  @Field(() => Int)
  userId: number;
}
