import { Logger, Provider } from '@nestjs/common';

const userCLILoggerSymbol = Symbol('userCLILoggerSymbol');

export const UserProvider: Provider = {
  provide: userCLILoggerSymbol,
  useFactory: (): Logger => {
    return new Logger('user-cli');
  },
};
