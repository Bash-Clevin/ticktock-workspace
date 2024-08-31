import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/models/post/entity/post.entity';
import { User } from 'src/models/user/entity/user.entity';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field(() => User)
  User: User;

  @Field(() => Post)
  Post: Post;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
