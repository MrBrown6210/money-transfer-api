import { Logger, Provider } from '@nestjs/common';

export const userLoggerSymbol = Symbol('userLoggerSymbol');

export const UserLoggerProvider: Provider = {
  provide: userLoggerSymbol,
  useFactory: (): Logger => {
    return new Logger('user');
  },
};
