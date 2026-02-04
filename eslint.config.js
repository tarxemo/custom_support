import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                ...globals.browser,
                ...globals.es2020
            }
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            'react-hooks': reactHooksPlugin
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn'
        }
    },
    {
        ignores: ['dist/**', 'node_modules/**', '*.config.js', '*.config.ts']
    }
];
