import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LikeDto {
  @Field()
  postId: number;

  @Field()
  userId: number;
}
