import { Injectable } from '@nestjs/common';
import { DateVO } from 'src/lib/ddd/domain/value-objects/date.value-object';
import { UUID } from 'src/lib/ddd/domain/value-objects/uuid.value-object';
import { UserEntity } from '../domain/entities/user.entity';
import { Email } from '../domain/value-objects/email.value-object';
import { UserOrmEntity } from './user.orm-entity';

@Injectable()
export class UserOrmMapper {
  toOrmProps(entity: UserEntity): UserOrmEntity {
    return new UserOrmEntity({
      id: entity.id.unpack(),
      email: entity.email.unpack(),
      name: entity.name,
      password: entity.password,
      createdAt: entity.createdAt.unpack(),
      updatedAt: entity.updatedAt.unpack(),
    });
  }

  toDomainProp(ormEntity: UserOrmEntity): UserEntity {
    return new UserEntity({
      id: new UUID(ormEntity.id),
      email: new Email(ormEntity.email),
      name: ormEntity.name,
      password: ormEntity.password,
      createdAt: new DateVO(ormEntity.createdAt),
      updatedAt: new DateVO(ormEntity.updatedAt),
    });
  }
}
