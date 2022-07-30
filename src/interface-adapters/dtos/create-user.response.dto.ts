import { Field, ObjectType } from '@nestjs/graphql';

// Question: Maybe It should seperate between request interface, and response interface?
@ObjectType()
export class CreateUserResponse {
  @Field()
  readonly email: string;
  @Field()
  readonly name: string;
  //   readonly createdAt: string;
  //   readonly updatedAt: string;

  constructor(create: { email: string; name: string }) {
    this.email = create.email;
    this.name = create.name;
  }
}
