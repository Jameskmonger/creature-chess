/*
👋 Hi! This file was autogenerated by tslint-to-eslint-config.
https://github.com/typescript-eslint/tslint-to-eslint-config

It represents the closest reasonable ESLint configuration to this
project's original TSLint configuration.

We recommend eventually switching this configuration to extend from
the recommended rulesets in typescript-eslint.
https://github.com/typescript-eslint/tslint-to-eslint-config/blob/master/docs/FAQs.md

Happy linting! 💖
*/

module.exports = {
	env: {
		browser: true,
		node: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		sourceType: "module",
	},
	plugins: [
		"jsdoc",
		"prefer-arrow",
		"import",
		"react",
		"react-hooks",
		"@typescript-eslint",
	],
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		"@typescript-eslint/adjacent-overload-signatures": "error",
		"@typescript-eslint/array-type": [
			"error",
			{
				default: "array",
			},
		],
		"@typescript-eslint/ban-types": [
			"error",
			{
				types: {
					"Object": {
						message: "Avoid using the `Object` type. Did you mean `object`?",
					},
					"Function": {
						message:
							"Avoid using the `Function` type. Prefer a specific function type, like `() => void`.",
					},
					"Boolean": {
						message: "Avoid using the `Boolean` type. Did you mean `boolean`?",
					},
					"Number": {
						message: "Avoid using the `Number` type. Did you mean `number`?",
					},
					"String": {
						message: "Avoid using the `String` type. Did you mean `string`?",
					},
					"Symbol": {
						message: "Avoid using the `Symbol` type. Did you mean `symbol`?",
					},
					"{}": false,
					"object": false,
				},
			},
		],
		"@typescript-eslint/consistent-type-assertions": "error",
		"@typescript-eslint/consistent-type-definitions": "off",
		"@typescript-eslint/explicit-member-accessibility": [
			"error",
			{
				accessibility: "explicit",
			},
		],
		"@typescript-eslint/indent": "off",
		"@typescript-eslint/member-delimiter-style": [
			"error",
			{
				multiline: {
					delimiter: "semi",
					requireLast: true,
				},
				singleline: {
					delimiter: "semi",
					requireLast: false,
				},
			},
		],
		"@typescript-eslint/member-ordering": "error",
		"@typescript-eslint/naming-convention": "off",
		"@typescript-eslint/no-empty-function": "error",
		"@typescript-eslint/no-empty-interface": "error",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-misused-new": "error",
		"@typescript-eslint/no-namespace": "error",
		"@typescript-eslint/no-parameter-properties": "off",
		"@typescript-eslint/no-require-imports": "off",
		"@typescript-eslint/no-shadow": [
			"error",
			{
				hoist: "all",
			},
		],
		"@typescript-eslint/no-unused-expressions": "error",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/no-var-requires": "error",
		"@typescript-eslint/prefer-for-of": "error",
		"@typescript-eslint/prefer-function-type": "error",
		"@typescript-eslint/prefer-namespace-keyword": "error",
		"@typescript-eslint/quotes": [
			"error",
			"double",
			{
				avoidEscape: true,
			},
		],
		"@typescript-eslint/semi": ["error", "always"],
		"@typescript-eslint/triple-slash-reference": [
			"error",
			{
				path: "always",
				types: "prefer-import",
				lib: "always",
			},
		],
		"@typescript-eslint/type-annotation-spacing": "error",
		"@typescript-eslint/unified-signatures": "error",
		"arrow-body-style": "error",
		"arrow-parens": ["off", "always"],
		"brace-style": ["error", "1tbs"],
		"comma-dangle": "off",
		"complexity": "off",
		"constructor-super": "error",
		"curly": "error",
		"default-case": "error",
		"eol-last": "error",
		"eqeqeq": ["error", "smart"],
		"guard-for-in": "error",
		"id-blacklist": [
			"error",
			"any",
			"Number",
			"number",
			"String",
			"string",
			"Boolean",
			"boolean",
			"Undefined",
			"undefined",
		],
		"id-match": "error",
		"import/no-default-export": "warn",
		"import/order": "off",
		"jsdoc/check-alignment": "error",
		"jsdoc/check-indentation": "error",
		"jsdoc/newline-after-description": "error",
		"max-classes-per-file": ["error", 1],
		"max-len": [
			"error",
			{
				code: 160,
			},
		],
		"new-parens": "error",
		"no-bitwise": "error",
		"no-caller": "error",
		"no-cond-assign": "error",
		"no-console": [
			"error",
			{
				allow: [
					"log",
					"warn",
					"dir",
					"timeLog",
					"assert",
					"clear",
					"count",
					"countReset",
					"group",
					"groupEnd",
					"table",
					"dirxml",
					"error",
					"groupCollapsed",
					"Console",
					"profile",
					"profileEnd",
					"timeStamp",
					"context",
				],
			},
		],
		"no-debugger": "error",
		"no-empty": "error",
		"no-eval": "error",
		"no-fallthrough": "off",
		"no-invalid-this": "off",
		"no-multiple-empty-lines": "error",
		"no-new-wrappers": "error",
		"no-throw-literal": "error",
		"no-trailing-spaces": "error",
		"no-undef-init": "error",
		"no-underscore-dangle": "error",
		"no-unsafe-finally": "error",
		"no-unused-labels": "error",
		"no-var": "error",
		"object-shorthand": "error",
		"one-var": ["error", "never"],
		"prefer-arrow/prefer-arrow-functions": "off",
		"prefer-const": "error",
		"quote-props": ["error", "consistent-as-needed"],
		"radix": "error",
		"react/forbid-component-props": [
			"error",
			{
				forbid: ["style"],
			},
		],
		"react/jsx-boolean-value": [0],
		"react/jsx-curly-spacing": [
			"error",
			{
				when: "never",
			},
		],
		"react/jsx-equals-spacing": ["error", "never"],
		"react/jsx-key": "error",
		"react/jsx-no-bind": "off",
		"react/jsx-tag-spacing": [
			"error",
			{
				afterOpening: "allow",
				closingSlash: "allow",
			},
		],
		"react/jsx-wrap-multilines": "error",
		"react/self-closing-comp": "error",
		"space-before-function-paren": "off",
		"spaced-comment": [
			"error",
			"always",
			{
				markers: ["/"],
			},
		],
		"use-isnan": "error",
		"valid-typeof": "off",
	},
};
