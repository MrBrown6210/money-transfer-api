import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands/create-user/create-user.handler';
import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
import { UserProvider } from './user.provider';

const httpControllers = [CreateUserHttpController];

const messageController = [];

const repositories = [];

const commandHandlers = [CreateUserHandler];

const queryHandlers = [];

@Module({
  imports: [CqrsModule],
  controllers: [...httpControllers],
  providers: [
    ...messageController,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
  ],
})
export class UserModule {}
