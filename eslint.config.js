import globals from 'globals';
import pluginJs from '@eslint/js';
import jsdocPlugin from 'eslint-plugin-jsdoc';

// Alter this config file to meet your project's needs and standards.
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      jsdoc: jsdocPlugin,
      prettier: '@eslint/plugin-prettier',
    },
    rules: {
      'indent': 'off', // Prettier is handling this
      'linebreak-style': 'off', // Prettier is handling this
      'quotes': 'off', // Prettier is handling this
      'semi': 'off', // Prettier is handling this
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/check-types': 'error',
      'jsdoc/implements-on-classes': 'error',
      'jsdoc/newline-after-description': 'off',
      'jsdoc/no-undefined-types': 'error',
      'jsdoc/require-description': 'error',
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: true,
            FunctionExpression: true,
          },
        },
      ],
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-description': 'error',
      'jsdoc/require-param-name': 'error',
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-returns-check': 'error',
      'jsdoc/require-returns-description': 'error',
      'jsdoc/require-returns-type': 'error',
    },
  },
];
