// eslint.config.js

import js from '@eslint/js'; // Base ESLint rules for JavaScript
import globals from 'globals'; // Set of predefined global variables (like window, document, etc.)
import reactHooks from 'eslint-plugin-react-hooks'; // Rules for React Hooks best practices
import reactRefresh from 'eslint-plugin-react-refresh'; // Ensures fast-refresh works correctly in dev

export default [
  {
    // Exclude build output from linting
    ignores: ['dist'],
  },
  {
    // Target all JS/JSX files
    files: ['**/*.{js,jsx}'],

    languageOptions: {
      ecmaVersion: 2020, // Support modern JS syntax (e.g. optional chaining, nullish coalescing)
      globals: globals.browser, // Enable browser-specific globals like `window`, `document`
      parserOptions: {
        ecmaVersion: 'latest', // Use the latest ECMAScript features
        ecmaFeatures: { jsx: true }, // Enable JSX syntax
        sourceType: 'module', // Enable `import/export` statements
      },
    },

    plugins: {
      'react-hooks': reactHooks, // Include rules for React Hooks
      'react-refresh': reactRefresh, // Helps React Fast Refresh avoid stale components
    },

    rules: {
      // Start with base ESLint rules
      ...js.configs.recommended.rules,

      // Add recommended rules for React Hooks
      ...reactHooks.configs.recommended.rules,

      // Allow unused UPPER_CASE variables (commonly used for constants/enums)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      // Warn if components aren't exported in a way compatible with React Fast Refresh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
];
