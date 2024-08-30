import { Field, InputType, PickType } from '@nestjs/graphql';
import { User } from 'src/models/user/entity/user.entity';

@InputType()
export class RegisterDto extends PickType(
  User,
  ['email', 'password', 'name'],
  InputType,
) {
  @Field()
  confirmPassword: string;
}

@InputType()
export class LoginDto extends PickType(RegisterDto, ['email', 'password']) {}
