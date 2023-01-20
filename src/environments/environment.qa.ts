import type { Environment } from './environment.types';

export const env: Environment = {
  name: 'qa',
  region: 'us-east-1',
  profile: 'qa',

  database: {
    engine: '',
    database: '',
    host: '',
    username: '',
    password: '',
  },

  s3Buckets: {
    static: 'laps-web-static-assets-qa',
  },
};
