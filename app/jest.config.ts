export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'jest-transform-stub',
  },
  transform: {
    '^.+\\.vue$': ['@vue/vue3-jest', {
      tsconfig: {
        jsx: 'preserve',
        esModuleInterop: true,
      }
    }],
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.spec.json'
    }],
  },
  testMatch: ['**/__tests__/**/*.spec.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,vue}',
    '!src/main.ts',
    '!**/*.d.ts',
  ],
}
