import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserResponseStrict } from 'src/common/auth/auth.types';
import { Post } from 'src/models/post/entity/post.entity';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field(() => UserResponseStrict)
  User: UserResponseStrict;

  @Field(() => Post)
  Post: Post;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
