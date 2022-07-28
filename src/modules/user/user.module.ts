import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserHandler } from './commands/create-user/create-user.handler';
import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
import { UserOrmEntity } from './database/user.orm-entity';
import { UserOrmMapper } from './database/user.orm-mapper';
import { UserRepository } from './database/user.repository';
import { UserProvider } from './user.provider';

const httpControllers = [CreateUserHttpController];

const messageController = [];

const repositories = [UserRepository, UserOrmMapper];

const commandHandlers = [CreateUserHandler];

const queryHandlers = [];

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity]), CqrsModule],
  controllers: [...httpControllers],
  providers: [
    ...messageController,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
  ],
})
export class UserModule {}
