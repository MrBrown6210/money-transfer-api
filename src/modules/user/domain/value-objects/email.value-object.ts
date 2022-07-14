import {
  DomainPrimitive,
  ValueObject,
} from 'src/lib/ddd/domain/base-classes/value-object.base';
import { Guard } from 'src/lib/ddd/domain/guard/guard';
import {
  ArgumentInvalidException,
  ArgumentOutOfRangeException,
} from 'src/lib/exceptions';

export class Email extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = Email.format(value);
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIsBetween(value, 5, 320)) {
      throw new ArgumentOutOfRangeException('Email');
    }
    if (!value.includes('@')) {
      throw new ArgumentInvalidException('Email has incorrect format');
    }
  }

  static format(email: string): string {
    return email.trim().toLowerCase();
  }
}
