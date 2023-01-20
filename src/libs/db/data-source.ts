import { env } from '@app/env';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';
import * as fromEntities from '../../entities';

const credentials = {
  username: env.database.username,
  password: env.database.password,
  host: env.database.host,
  port: env.database.port,
} as PostgresConnectionCredentialsOptions;

export const dataSource = new DataSource({
  type: env.database.engine,
  database: env.database.database,
  logger: ['local', 'sbx'].includes(env.name) ? 'debug' : null,
  entities: [...fromEntities.entities],
  subscribers: [],
  entitySkipConstructor: true,
  synchronize: false,
  ...credentials,
} as DataSourceOptions);

export const dataSourceOptsForSeeder = (dropSchema = false) =>
  new DataSource({
    type: env.database.engine,
    database: env.database.database,
    logger: ['local', 'sbx'].includes(env.name) ? 'debug' : null,
    entities: [...fromEntities.entities],
    entitySkipConstructor: true,
    synchronize: dropSchema,
    dropSchema,
    ...credentials,
  } as DataSourceOptions);
