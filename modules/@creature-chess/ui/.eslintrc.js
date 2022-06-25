module.exports = {
	overrides: [
		{
			files: ["*.stories.tsx"],
			rules: {
				"import/no-default-export": "off",
			},
		},
	],
};
