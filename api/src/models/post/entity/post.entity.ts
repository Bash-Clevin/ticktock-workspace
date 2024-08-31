import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Like } from 'src/models/like/entity/like.entity';
import { User } from 'src/models/user/entity/user.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;
  @Field()
  text: string;
  @Field()
  video: string;
  @Field(() => User)
  User: User;
  @Field(() => [Like], { nullable: true })
  Likes?: Like[];
}

@ObjectType()
export class PostDetails extends Post {
  @Field(() => [Number], { nullable: true })
  otherPostIds?: number[];
}
