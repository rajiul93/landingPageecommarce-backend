/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'], // __tests__ ফোল্ডারে .test.ts ফাইলের জন্য
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/src'], // শুধু src ফোল্ডারে টেস্ট খুঁজবে
};
