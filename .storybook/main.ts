import type { StorybookConfig } from "@storybook/react-webpack5";

import { join, dirname } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
	stories: [
		"../**/*.stories.@(js|jsx|ts|tsx)",
	],
	addons: [
		getAbsolutePath("@storybook/addon-links"),
		getAbsolutePath("@storybook/addon-essentials"),
		getAbsolutePath("@storybook/addon-onboarding"),
		getAbsolutePath("@storybook/addon-interactions"),
	],
	framework: {
		name: getAbsolutePath("@storybook/react-webpack5"),
		options: {
			builder: {
				useSWC: true,
			},
		},
	},
	docs: {
		autodocs: "tag",
	},
	staticDirs: [
		{ from: "../images", to: "/images" },
	],
	env: config => ({
		...config,
		CREATURE_CHESS_IMAGE_URL: "http://localhost:6006/images"
	})
};

export default config;
