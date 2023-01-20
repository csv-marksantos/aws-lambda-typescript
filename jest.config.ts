/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/spec/e2e/**/*.spec.ts', '**/tests/spec/integration/**/*.spec.ts'],
  transform: {
    '^.+\\.ts?$': 'esbuild-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    '@app/env': '<rootDir>/src/environments/environment.ts',
  },
};
