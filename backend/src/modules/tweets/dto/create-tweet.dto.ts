import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateTweetInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Tweet content cannot be empty' })
  @MaxLength(280, { message: 'Tweet content cannot exceed 280 characters' })
  content: string;
}