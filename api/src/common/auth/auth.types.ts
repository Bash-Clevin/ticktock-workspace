import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/models/user/entity/user.entity';
import { RestrictProperties } from '../dtos/common.input';

@ObjectType()
export class ErrorType {
  @Field()
  message: string;
  @Field({ nullable: true })
  code?: string;
}

@ObjectType()
export class UserResponseStrict
  implements
    RestrictProperties<
      UserResponseStrict,
      Omit<User, 'password' | 'createdAt' | 'updatedAt'>
    >
{
  @Field()
  id: number;
  @Field()
  name: string;
  @Field({ nullable: true })
  bio: string;
  @Field({ nullable: true })
  image: string;
  @Field()
  email: string;
}

@ObjectType()
export class RegisterResponse {
  @Field(() => UserResponseStrict, { nullable: true })
  user?: UserResponseStrict;
  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class LoginResponse {
  @Field(() => UserResponseStrict, { nullable: true })
  user?: UserResponseStrict;
  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
