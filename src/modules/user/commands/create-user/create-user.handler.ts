import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserEntity } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.value-object';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  execute(command: CreateUserCommand): Promise<UserEntity> {
    const { email, name, password } = command;

    const user = new UserEntity({
      email: new Email(email),
      name,
      password,
    });
    return Promise.resolve(user);
  }
}
