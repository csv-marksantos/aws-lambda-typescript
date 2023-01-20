import type { Serverless } from 'serverless/aws';

import users from './src/users/handlers';
import seeders from './src/seeders/';

import { baseServerlessConfig, baseServerlessConfigProvider } from './serverless.base';

/**
 * Exposes all Lambdas
 */
const serverlessConfiguration = <Serverless>{
  ...baseServerlessConfig,
  provider: baseServerlessConfigProvider,
  functions: {
    ...seeders,
    ...users,
  },
};

module.exports = serverlessConfiguration;
