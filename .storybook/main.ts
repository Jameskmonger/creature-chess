import type { StorybookConfig } from "@storybook/react-webpack5";
import { join, dirname } from "path";
import { DefinePlugin } from "webpack";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
	stories: ["../**/*.stories.@(ts|tsx)"],
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
	staticDirs: [{ from: "../images", to: "/images" }],
	previewHead: (head) => `
		${head}
		<style>
		body {
			padding: 0 !important;
			height: 100vh !important;
		}

		#storybook-root {
			height: 100%;
			width: 100%;
		}
		</style>
	`,
	webpackFinal: (config) => ({
		...config,
		plugins: [
			...(config.plugins ?? []),
			new DefinePlugin({
				APP_VERSION: JSON.stringify("0.0.1"),
				APP_URL: JSON.stringify("https://example.com"),
				APP_API_URL: JSON.stringify("https://example.com"),
				APP_IMAGE_ROOT: JSON.stringify("http://localhost:6006/images"),
			}),
		],
	}),
};

export default config;
