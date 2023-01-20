import type { Environment } from './environment.types';

export const env: Environment = {
  name: 'sbx',
  region: 'us-east-1',
  profile: 'sbx',

  database: {
    engine: '',
    database: '',
    secretArn: '',
    resourceArn: '',
  },

  s3Buckets: {
    static: 'laps-web-static-assets-sbx',
  },
};
