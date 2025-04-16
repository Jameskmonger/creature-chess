module.exports = {
	roots: ["<rootDir>/src"],
	transform: {
		"^.+.ts$": "ts-jest",
	},
	testMatch: ["**/*.test.ts?(x)"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.ts"],
	coveragePathIgnorePatterns: [".*.test.ts"],
	coverageReporters: ["lcov"],
	reporters: ["jest-standard-reporter"],
	verbose: true,
};
