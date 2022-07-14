import { TypeormEntityBase } from 'src/lib/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserOrmEntity extends TypeormEntityBase {
  constructor(props?: UserOrmEntity) {
    super(props);
  }

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;
}
