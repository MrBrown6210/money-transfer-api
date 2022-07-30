import { Body, Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { match, Result } from 'oxide.ts';
import { routesV1 } from 'src/infrastructure/configs/app.routes';
import { CreateUserResponse } from 'src/interface-adapters/dtos/create-user.response.dto';
import { ConflictException } from 'src/lib/exceptions';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserAlreadyExistsError } from '../../errors/user.error';

@Controller(routesV1.version)
export class FindMeHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get(routesV1.user.me)
  async findMe() {
    return 'user';
  }
}
