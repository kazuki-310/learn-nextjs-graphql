const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^next-auth$': '<rootDir>/__mocks__/next-auth.js',
    '^@/lib/auth$': '<rootDir>/__mocks__/auth.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jose|openid-client|oauth|oidc-token-hash|@panva/hkdf|preact-render-to-string|preact|@babel/runtime|next-auth)/)'
  ]
};

module.exports = createJestConfig(customJestConfig);
