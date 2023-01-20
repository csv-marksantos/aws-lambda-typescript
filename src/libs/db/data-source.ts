import { env } from '@app/env';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';

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
  entities: [],
  subscribers: [],
  entitySkipConstructor: true,
  synchronize: false,
  ...credentials,
} as DataSourceOptions);
