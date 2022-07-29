import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from '../../database/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.value-object';
import { UserAlreadyExistsError } from '../../errors/user.error';
import { CreateUserCommand } from './create-user.command';

export type CreateUserError = UserAlreadyExistsError;

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(
    command: CreateUserCommand,
  ): Promise<Result<UserEntity, CreateUserError>> {
    const { email, name, password } = command;

    const isExist = await this.userRepo.exists(email);
    if (isExist) {
      return Err(new UserAlreadyExistsError());
    }

    const user = UserEntity.create({
      email: new Email(email),
      name,
      password,
    });

    const created = await this.userRepo.save(user);

    return Ok(created);
  }
}
