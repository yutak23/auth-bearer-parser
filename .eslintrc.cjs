/* eslint-env node */
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'airbnb-base',
		'airbnb-typescript/base',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],
	overrides: [
		{
			extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
			files: ['./**/*.{ts,tsx}']
		}
	],
	rules: {
		'import/no-extraneous-dependencies': ['warn', { packageDir: './' }],
		'@typescript-eslint/no-throw-literal': 'off',
		// TypeError: context.getScope is not a function in "eslint-plugin-import"
		// Temporary measures until transition to flat configurations
		'import/newline-after-import': 'off',
		'import/no-named-as-default': 'off',
		'import/no-mutable-exports': 'off',
		'import/no-amd': 'off'
	},
	ignorePatterns: ['esm', 'cjs', 'node_modules']
};
