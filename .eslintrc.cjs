module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'dicodingacademy',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/prop-types': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-alert': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.{js,jsx}', 'src/setupTests.js'],
      env: {
        jest: true,
      },
      globals: {
        vi: true,
      },
    },
    {
      files: ['cypress/**/*.{js,jsx}'],
      globals: {
        cy: true,
        Cypress: true,
        describe: true,
        it: true,
        beforeEach: true,
        afterEach: true,
        before: true,
        after: true,
        expect: true,
      },
    },
  ],
};
