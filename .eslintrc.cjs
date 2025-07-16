module.exports = {
  parser: '@typescript-eslint/parser', // define o parser do typescript
  parserOptions: {
    ecmaVersion: 2020, // permite parsing moderno
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // permite JSX
    },
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // regras TS
    'plugin:react/recommended', // regras React
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended', // acessibilidade
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended', // integra prettier ao eslint
    'prettier', // desativa regras que conflitam com prettier
  ],
  rules: {
    'prettier/prettier': 'error', // erros prettier aparecem como erro
    // Exemplo de regras extras que você pode querer:
    'react/react-in-jsx-scope': 'off', // Next.js não precisa importar React
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  settings: {
    react: {
      version: 'detect', // detecta versão do react automaticamente
    },
    'import/resolver': {
      typescript: {}, // permite resolver import TS
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
};
