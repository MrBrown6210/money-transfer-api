import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../domain/entities/user.entity';
import { UserOrmEntity } from './user.orm-entity';
import { UserOrmMapper } from './user.orm-mapper';
import { FindUsersParams, UserRepositoryPort } from './user.repository.port';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
    @Inject(UserOrmMapper)
    private readonly userOrmMapper: UserOrmMapper,
  ) {}

  async findOneByIdOrThrow(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneByOrFail({
      id: id,
    });

    return this.userOrmMapper.toDomainProp(user);
  }

  async findOneByEmailOrThrow(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneByOrFail({
      email: email,
    });

    return this.userOrmMapper.toDomainProp(user);
  }

  async findUsers(query: FindUsersParams): Promise<UserEntity[]> {
    const users = await this.userRepository.findBy({ email: query.email });
    return users.map((user) => this.userOrmMapper.toDomainProp(user));
  }

  async exists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({
      email: email,
    });
    if (user) return true;
    return false;
  }
}
