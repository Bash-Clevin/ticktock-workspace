import { Field, ObjectType } from '@nestjs/graphql';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { User as UserType } from '@prisma/client';

@ObjectType()
export class User implements RestrictProperties<User, UserType> {
  id: number;
  name: string;
  @Field({ nullable: true })
  bio: string;
  @Field({ nullable: true })
  image: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
