module.exports = {
  semi: true,
  tabWidth: 2,
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  useTabs: false,
  parser: 'typescript',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react', // React imports first
    '^next', // Next.js imports
    '^@/components/(.*)$', // Local components
    '^@/lib/(.*)$', // Local lib files
    '^@/styles/(.*)$', // Style imports
    '^[./]', // Relative imports
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
