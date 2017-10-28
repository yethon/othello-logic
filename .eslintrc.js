module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true,
    es6: true
  },
  globals: {
    '$': true,
    'require': true
  },
  rules: {
    'prefer-const': ['error', {
      ignoreReadBeforeAssign: false
    }],
    'curly': [
      2,
      'all'
    ],
    'eqeqeq': 2,
    'no-caller': 2,
    'no-console':0,
    'block-spacing': 2,
    'comma-dangle': [
      2,
      'never'
    ],
    'no-trailing-spaces': 2,
    'arrow-spacing': 2,
    'no-var': 2,
    'no-cond-assign': [
      2,
      'except-parens'
    ],
    'no-debugger': 0,
    'no-eval': 2,
    'guard-for-in': 0,
    'wrap-iife': 0,
    'linebreak-style': 0,
    'no-empty': [
      2,
      {
        'allowEmptyCatch': true
      }
    ],
    'no-new': 0,
    'no-plusplus': 0,
    'no-undef': 2,
    'dot-notation': 0,
    'strict': 0,
    'no-eq-null': 2,
    'no-unused-vars': 2,
    'key-spacing': [
      2,
      {
        'afterColon': true
      }
    ],
    'comma-style': [
      2,
      'last'
    ],
    'brace-style': [
      2,
      '1tbs',
      {
        'allowSingleLine': true
      }
    ],
    'no-spaced-func': 2,
    'eol-last': 2,
    'space-before-blocks': [
      2,
      'always'
    ],
    'indent': [
      2,
      2,
      {
        'SwitchCase': 2
      }
    ],
    'keyword-spacing': [
      2,
      {}
    ]
  }
};
