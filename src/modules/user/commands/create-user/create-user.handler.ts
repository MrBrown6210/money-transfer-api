import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserOrmEntity } from '../../database/user.orm-entity';
import { UserRepository } from '../../database/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.value-object';
import { UserAlreadyExistsError } from '../../errors/user.error';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<UserEntity> {
    const { email, name, password } = command;

    const isExist = await this.userRepo.exists(email);
    if (isExist) {
      throw new UserAlreadyExistsError();
    }

    const user = UserEntity.create({
      email: new Email(email),
      name,
      password,
    });

    const created = await this.userRepo.save(user);

    return created;
  }
}
