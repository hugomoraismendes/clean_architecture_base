const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' })
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/infra/bootstrap',
    '<rootDir>/src/infra/config',
    '<rootDir>/src/infra/http/routes',
    '<rootDir>/src/infra/db',
    '<rootDir>/src/infra/mappers',
    '<rootDir>/src/infra/http',
    '<rootDir>/src/infra/handlers',
    '<rootDir>/src/infra/middlewares',
    '<rootDir>/src/infra/tools',
    '<rootDir>/src/shared',
    '<rootDir>/src/shared/errors',
    '<rootDir>/src/entities/value-object',
    '<rootDir>/src/adapters/commons/base-repository.ts',
    '<rootDir>/src/app.ts',
    'index.ts'
  ],
  coverageReporters: ['json', 'lcov', 'text', 'cobertura', 'text-summary'],
  moduleDirectories: ['node_modules', 'src'],
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{ts,js,jsx}',
    '!<rootDir>/src/infra/**/*.ts',
    '!<rootDir>/src/adapters/**/**gateway.ts',
    '!<rootDir>/src/adapters/**/**presenter.ts'
  ],
  coverageDirectory: '<rootDir>/tests/coverage'
};
