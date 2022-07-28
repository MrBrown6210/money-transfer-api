import { DataSource } from 'typeorm';

import { config } from 'dotenv';
import { get } from 'env-var';
import { cwd } from 'process';

// Initializing dotenv
config();

const database = new DataSource({
  type: 'postgres',
  host: get('DB_HOST').required().asString(),
  port: get('DB_PORT').required().asIntPositive(),
  username: get('DB_USERNAME').required().asString(),
  password: get('DB_PASSWORD').required().asString(),
  database: get('DB_NAME').required().asString(),
  entities: ['src/**/*.orm-entity.ts'],
  migrations: ['src/**/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

// const databaseX = {
//   ...typeormConfig,
//   entities: ['src/**/*.orm-entity.ts'],
//   migrationsTableName: 'migrations',
//   migrations: ['src/**/migrations/*.ts'],
//   seeds: ['src/**/seeding/**/*.seeder.ts'],
//   factories: ['src/**/factories/**/*.ts'],
//   cli: {
//     migrationsDir: `src/infrastructure/database/migrations`,
//   },
// };

export default database;
