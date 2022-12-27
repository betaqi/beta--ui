module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    // "eslint:recommended",
    './.eslintrc-auto-imports.json',
    'plugin:vue/vue3-essential',
    // "plugin:@typescript-eslint/recommended"
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {}
}
