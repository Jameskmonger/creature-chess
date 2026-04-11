const base = require("../../jest.config.base.js");

module.exports = {
	...base,
	displayName: "web-game",
	moduleNameMapper: {
		"^~/(.*)": "<rootDir>/src/$1",
	},
};
