module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/'
  },
  collectCoverage: true,
  globals: {
    ZAFClient: {
      init: () => {}
    }
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/spec'
  ],
  roots: ['./spec']
}
