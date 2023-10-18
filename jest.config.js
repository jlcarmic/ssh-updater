module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  preset: 'ts-jest',
  roots: ['<rootDir>/'],
  testRegex: '(/tests//.*|(\\.|/)(test|spec))\\.ts?$',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
}
