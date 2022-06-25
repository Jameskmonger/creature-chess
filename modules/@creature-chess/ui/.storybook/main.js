module.exports = {
	stories: ["../../../../**/*.stories.@(js|jsx|ts|tsx)"],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
	previewHead: (head) => `
		${head}
		<style>
		body {
			padding: 0 !important;
			height: 100vh !important;
		}

		#root {
			height: 100%;
			width: 100%;
		}
		</style>
	`,
};
