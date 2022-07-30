import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { match, Result } from 'oxide.ts';
import { CreateUserCommand } from './create-user.command';
import { CreateUserRequest } from './create-user.request.dto';
import { CreateUserResponse } from 'src/interface-adapters/dtos/create-user.response.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserError } from './create-user.service';
import { UserAlreadyExistsError } from '../../errors/user.error';
import { ConflictException } from 'src/lib/exceptions';

// If you are Using GraphQL you'll need a Resolver instead of a Controller
@Resolver()
export class CreateUserGraphqlResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Query(() => String)
  hello() {
    return 'hello';
  }

  @Mutation(() => CreateUserResponse)
  async create(
    @Args('input') input: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    const command = CreateUserCommand.create({ ...input });

    const result = await this.commandBus.execute<
      CreateUserCommand,
      Result<UserEntity, CreateUserError>
    >(command);

    return match(result, {
      Ok: (user) => {
        return new CreateUserResponse({
          email: user.email.unpack(),
          name: user.name,
        });
      },
      Err: (error) => {
        if (error instanceof UserAlreadyExistsError) {
          throw new ConflictException(error.message);
        }
        throw error;
      },
    });
  }
}
