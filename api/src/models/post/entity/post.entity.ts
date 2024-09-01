import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserResponseStrict } from 'src/common/auth/auth.types';
import { Like } from 'src/models/like/entity/like.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;
  @Field()
  text: string;
  @Field()
  video: string;
  @Field()
  createdAt: Date;
  @Field(() => UserResponseStrict)
  User: UserResponseStrict;
  @Field(() => [Like], { nullable: true })
  Likes?: Like[];
}

@ObjectType()
export class PostDetails extends Post {
  @Field(() => [Number], { nullable: true })
  otherPostIds?: number[];
}
