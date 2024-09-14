import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

export default {
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    globals: globals.browser,
  },
  plugins: {
    react,
    'react-hooks': reactHooks,
    '@typescript-eslint': typescriptEslint,
    prettier,
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignores: ['dist'],
}
