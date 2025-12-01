import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    // Base ESLint recommended config
    eslint.configs.recommended,

    // TypeScript config - for all TS/JS files
    ...tseslint.configs.recommendedTypeChecked,

    // Custom rules for specific files
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
    },
    {
        files: ['**/*.{js,ts,jsx,tsx}'],
        rules: {
            'no-console': 'warn',
        },
    },
];
