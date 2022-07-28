import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routesV1 } from 'src/infrastructure/configs/app.routes';
import { CreateUserResponse } from 'src/interface-adapters/dtos/create-user.response.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserAlreadyExistsError } from '../../errors/user.error';
import { CreateUserCommand } from './create-user.command';
import { CreateUserRequest } from './create-user.request.dto';

@Controller(routesV1.version)
export class CreateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.user.root)
  async create(@Body() body: CreateUserRequest) {
    const command = CreateUserCommand.create({ ...body });

    try {
      const result = await this.commandBus.execute<
        CreateUserCommand,
        UserEntity
      >(command);

      return new CreateUserResponse({
        email: result.email.unpack(),
        name: result.name,
      });
    } catch (error) {
      if (error instanceof UserAlreadyExistsError)
        throw new ConflictException(error);
      throw error;
    }
  }
}
