import { UserEntity } from '../domain/entities/user.entity';

export interface FindUsersParams {
  readonly email?: string;
}

/* Repository port belongs to application's core / domain, but since it usually
 changes together with repository it is kept in the same directory for
 convenience. */
export interface UserRepositoryPort {
  save(user: UserEntity): Promise<UserEntity>;
  findOneByIdOrThrow(id: string): Promise<UserEntity>;
  findOneByEmailOrThrow(email: string): Promise<UserEntity>;
  findUsers(query: FindUsersParams): Promise<UserEntity[]>;
  exists(email: string): Promise<boolean>;
}
