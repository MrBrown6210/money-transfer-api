import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserService } from './commands/create-user/create-user.service';
import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
import { UserOrmEntity } from './database/user.orm-entity';
import { UserOrmMapper } from './database/user.orm-mapper';
import { UserRepository } from './database/user.repository';
import { UserLoggerProvider } from './user.provider';

const httpControllers = [CreateUserHttpController];

const messageController = [];

const repositories = [UserRepository, UserOrmMapper];

const commandHandlers = [CreateUserService];

const queryHandlers = [];

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity]), CqrsModule],
  controllers: [...httpControllers],
  providers: [
    ...messageController,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    UserLoggerProvider,
  ],
})
export class UserModule {}
