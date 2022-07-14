import { AggregateRoot } from '@nestjs/cqrs';
import { BaseEntityProps } from 'src/lib/ddd/domain/base-classes/base-entity.interface';
import { DateVO } from 'src/lib/ddd/domain/value-objects/date.value-object';
import { UUID } from 'src/lib/ddd/domain/value-objects/uuid.value-object';
import { Email } from '../value-objects/email.value-object';

export interface CreateUserProps {
  email: Email;
  name: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserProps extends CreateUserProps, BaseEntityProps {
  id: UUID;
}

export class UserEntity extends AggregateRoot implements UserProps {
  readonly id: UUID;
  email: Email;
  name: string;
  password: string;
  createdAt: DateVO;
  updatedAt: DateVO;

  constructor(props: UserProps) {
    super();
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.password = props.password;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(create: CreateUserProps) {
    const user = new UserEntity({
      id: UUID.generate(),
      email: create.email,
      name: create.name,
      password: create.password,
      createdAt: DateVO.now(),
      updatedAt: DateVO.now(),
    });
    return user;
  }

  updateEmail(email: Email) {
    this.email = email;
  }
}
