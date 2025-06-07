import { TestConfig } from './types';

export const TEST_CONFIG: TestConfig = {
  baseUrl: 'http://localhost:3000',
  timeout: 10000,
  slowMo: 500,
  headless: false,
  screenshots: {
    enabled: true,
    path: './tests/e2e/screenshots/',
  },
};