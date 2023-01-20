import type { Serverless } from 'serverless/aws';
import { env, envName } from './src/environments/environment.serverless';

console.log(`-------------- USING ENV: ${env.name} ----------------`);

export const baseServerlessConfigProvider: Serverless['provider'] = {
  environment: {
    NODE_ENV: envName,
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
  },
  memorySize: 1024,
  name: 'aws',
  profile: env.profile,
  region: env.region,
  runtime: 'nodejs16.x',
  stage: env.name,
};

export const baseServerlessConfig: Partial<Serverless> = {
  frameworkVersion: '3',
  service: 'csv-demo',
  package: {
    individually: true,
    excludeDevDependencies: true,
    patterns: ['!node_modules/**', '!.build'],
  },
  plugins: ['serverless-esbuild', 'serverless-offline'],
  custom: {
    serverlessOffline: {
      allowCache: true,
      useChildProcesses: true,
    },
    esbuild: {
      bundle: true,
      concurrency: 3,
      target: 'node14',
      minify: env.name !== 'local',
      sourcemap: false,
      sourcesContent: false,
      plugins: './plugins.js',
      define: { 'require.resolve': undefined },
      exclude: ['aws-sdk', 'pg-native'],
    },
  },
};
