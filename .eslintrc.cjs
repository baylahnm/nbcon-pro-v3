/**
 * ESLint configuration focusing on i18n integrity.
 * - Disallow hardcoded UI strings in JSX (use t('...')).
 * - Allow safe exceptions (aria-label, title, data-testid, id, className).
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  settings: {
    react: { version: 'detect' }
  },
  env: {
    browser: true,
    es2022: true
  },
  overrides: [
    {
      files: ['src/**/*.tsx'],
      rules: {
        // Flag string literals in JSX to enforce i18n usage
        'react/jsx-no-literals': ['error', {
          noStrings: true,
          allowedStrings: [],
          ignoreProps: true
        }]
      }
    }
  ],
  rules: {
    // Reasonable defaults
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    // RTL safety guard - prevent directional utilities
    'no-restricted-syntax': [
      'error',
      { 
        selector: "Literal[value=/\\b(text-left|text-right|ml-|mr-|pl-|pr-|left-|right-|float-left|float-right|rounded-l|rounded-r)\\b/]", 
        message: 'Use logical utilities: text-start/end, ms/me, ps/pe, inset-s/e, float-start/end, rounded-s/e' 
      }
    ]
  }
}


