import { AggregateRoot } from '@nestjs/cqrs';
import { UUID } from 'src/lib/ddd/domain/value-objects/uuid.value-object';
import { Email } from '../value-objects/email.value-object';

export interface CreateUserProps {
  email: Email;
  name: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserProps extends CreateUserProps {
  id: UUID;
}

export class UserEntity extends AggregateRoot implements UserProps {
  readonly id: UUID;
  email: Email;
  name: string;
  password: string;

  constructor(create: CreateUserProps) {
    super();
    this.id = UUID.generate();
    this.email = create.email;
    this.name = create.name;
    this.password = create.password;
  }

  updateEmail(email: Email) {
    this.email = email;
  }
}
