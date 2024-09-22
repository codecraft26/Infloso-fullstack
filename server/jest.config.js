export default {
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest',
    },
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.js', '.mjs'],
    globals: {
      'jest': {
        useESM: true,
      },
    },
  };
  