import { Field, InputType, PickType } from '@nestjs/graphql';
import { User } from 'src/models/user/entity/user.entity';

@InputType()
export class RegisterInputDto extends PickType(
  User,
  ['name', 'password', 'email'],
  InputType,
) {
  @Field()
  confirmPassword: string;
}

@InputType()
export class LoginInputDto extends PickType(RegisterInputDto, [
  'email',
  'password',
]) {}
