export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
  ) {}

  static create({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) {
    return new CreateUserCommand(email, name, password);
  }
}
