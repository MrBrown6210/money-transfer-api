import { CreateUser } from '../interfaces/user/create-user.interface';

// Question: Maybe It should seperate between request interface, and response interface?
export class CreateUserResponse {
  readonly email: string;
  readonly name: string;
  //   readonly createdAt: string;
  //   readonly updatedAt: string;

  constructor(create: { email: string; name: string }) {
    this.email = create.email;
    this.name = create.name;
  }
}
