import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { match, Result } from 'oxide.ts';
import { routesV1 } from 'src/infrastructure/configs/app.routes';
import { CreateUserResponse } from 'src/interface-adapters/dtos/create-user.response.dto';
import { ConflictException } from 'src/lib/exceptions';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserAlreadyExistsError } from '../../errors/user.error';
import { CreateUserCommand } from './create-user.command';
import { CreateUserError } from './create-user.service';
import { CreateUserRequest } from './create-user.request.dto';

@Controller(routesV1.version)
export class CreateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.user.root)
  async create(@Body() body: CreateUserRequest) {
    const command = CreateUserCommand.create({ ...body });

    const result = await this.commandBus.execute<
      CreateUserCommand,
      Result<UserEntity, CreateUserError>
    >(command);

    return match(result, {
      Ok: (user) =>
        new CreateUserResponse({
          email: user.email.unpack(),
          name: user.name,
        }),
      Err: (error) => {
        if (error instanceof UserAlreadyExistsError) {
          throw new ConflictException(error.message);
        }
        throw error;
      },
    });
  }
}
