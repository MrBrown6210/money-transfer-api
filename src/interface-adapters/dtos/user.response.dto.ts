import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

// Question: Maybe It should seperate between request interface, and response interface?
export class UserResponse {
  readonly email: string;
  readonly name: string;
  //   readonly createdAt: string;
  //   readonly updatedAt: string;
  constructor(user: UserEntity) {
    this.email = user.email.unpack();
    this.name = user.name;
  }
}
