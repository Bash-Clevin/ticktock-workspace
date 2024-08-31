import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload';

@InputType()
export class CreatePostDto {
  // @Field(() => Int)
  // @IsInt()
  // @IsNotEmpty()
  // userId: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  text: string;

  @Field(() => GraphQLUpload, { nullable: true })
  @IsString()
  @IsNotEmpty()
  video: string;
}
