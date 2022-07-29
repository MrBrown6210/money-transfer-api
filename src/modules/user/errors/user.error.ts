import { ExceptionBase } from '../../../lib/exceptions';

const message = 'User already exists';

export class UserAlreadyExistsError extends ExceptionBase {
  public readonly code = 'USER.ALREADY_EXISTS';

  constructor(metadata?: unknown) {
    super(message, metadata);
  }
}
