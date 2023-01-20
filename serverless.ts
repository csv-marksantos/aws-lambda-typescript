import type { Serverless } from 'serverless/aws';

import users from './src/users/handlers';

import { baseServerlessConfig, baseServerlessConfigProvider } from './serverless.base';

/**
 * Exposes all Lambdas
 */
const serverlessConfiguration = <Serverless>{
  ...baseServerlessConfig,
  provider: baseServerlessConfigProvider,
  functions: {
    ...users,
  },
};

module.exports = serverlessConfiguration;
