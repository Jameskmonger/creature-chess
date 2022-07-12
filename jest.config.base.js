module.exports = {
	roots: ["<rootDir>/src"],
	transform: {
		"^.+.ts$": "ts-jest",
	},
	testRegex: "(.+/?).*.test.tsx?$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.ts"],
	coveragePathIgnorePatterns: [".*.test.ts"],
	coverageReporters: ["lcov"],
	reporters: ["jest-standard-reporter"],
	verbose: true,
};
