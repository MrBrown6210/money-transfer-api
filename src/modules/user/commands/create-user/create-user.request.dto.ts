import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUser } from 'src/interface-adapters/interfaces/user/create-user.interface';

export class CreateUserRequest implements CreateUser {
  @MinLength(5)
  @MaxLength(320)
  @IsEmail()
  email: string;

  @MinLength(2)
  @MaxLength(32)
  @IsString()
  name: string;

  @MinLength(4)
  @Matches(/^[a-zA-Z0-9]*$/)
  password: string;
}
