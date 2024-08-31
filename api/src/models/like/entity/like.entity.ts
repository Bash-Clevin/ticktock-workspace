import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Like as LikeType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class Like
  implements
    RestrictProperties<Like, Omit<LikeType, 'createdAt' | 'updatedAt'>>
{
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  userId: number;
  @Field(() => Int)
  postId: number;
}
