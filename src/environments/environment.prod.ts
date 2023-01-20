import type { Environment } from './environment.types';

export const env: Environment = {
  name: 'prod',
  region: 'us-east-1',
  profile: 'prod',

  database: {
    engine: '',
    database: '',
    host: '',
    username: '',
    password: '',
  },

  s3Buckets: {
    static: 'laps-web-static-assets-prod',
  },
};
