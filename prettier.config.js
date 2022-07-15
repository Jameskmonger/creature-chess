/* eslint-disable no-undef */
module.exports = {
	importOrder: [
		"^react$",
		"<THIRD_PARTY_MODULES>",
		"^@shoki/.+$",
		"^@creature-chess/.+$",
		"^[./]",
	],
	importOrderSeparation: true,

	arrowParens: "always",
	bracketSpacing: true,
	endOfLine: "lf",
	htmlWhitespaceSensitivity: "css",
	jsxBracketSameLine: false,
	jsxSingleQuote: false,
	printWidth: 80,
	quoteProps: "consistent",
	semi: true,
	singleQuote: false,
	trailingComma: "es5",
	useTabs: true,
};
