import type { Environment } from './environment.types';

export const env: Environment = {
  name: 'dev',
  region: 'us-east-1',
  profile: 'dev',

  database: {
    engine: '',
    database: '',
    host: '',
    username: '',
    password: '',
  },

  s3Buckets: {
    static: 'laps-web-static-assets-dev',
  },
};
