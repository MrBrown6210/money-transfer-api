import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserResponse } from 'src/interface-adapters/dtos/create-user.response.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserCommand } from './create-user.command';
import { CreateUserRequest } from './create-user.request.dto';

const route = {
  root: '/users',
};

@Controller(route.root)
export class CreateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() body: CreateUserRequest) {
    const command = CreateUserCommand.create({ ...body });
    const result = await this.commandBus.execute<CreateUserCommand, UserEntity>(
      command,
    );

    return new CreateUserResponse({
      email: result.email.unpack(),
      name: result.name,
    });
  }
}
