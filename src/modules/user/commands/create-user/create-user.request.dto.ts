import { ArgsType, Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUser } from 'src/interface-adapters/interfaces/user/create-user.interface';

@ArgsType()
@InputType()
export class CreateUserRequest implements CreateUser {
  @MinLength(5)
  @MaxLength(320)
  @IsEmail()
  @Field()
  email: string;

  @MinLength(2)
  @MaxLength(32)
  @IsString()
  @Field()
  name: string;

  @MinLength(4)
  @Matches(/^[a-zA-Z0-9]*$/)
  @Field()
  password: string;
}
