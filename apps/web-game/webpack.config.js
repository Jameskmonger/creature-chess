/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const { DefinePlugin, EnvironmentPlugin, ProvidePlugin } = require("webpack");

const outDir = path.resolve(__dirname, "dist");
const rootPackageJson = path.resolve(__dirname, "../../package.json");

module.exports = {
	mode: "development",
	devtool: "source-map",

	context: __dirname,
	entry: "./src/index.tsx",

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},

	resolve: {
		plugins: [new TsConfigPathsPlugin()],
		extensions: [".tsx", ".ts", ".js"],
		fallback: {
			"process/browser": require.resolve("process/browser"),
		},
	},

	output: {
		filename: "bundle-[contenthash].js",
		path: outDir,
	},

	plugins: [
		new ProvidePlugin({
			process: "process/browser",
		}),
		new EnvironmentPlugin({
			NODE_ENV: "production",
		}),
		new DefinePlugin({
			APP_VERSION: DefinePlugin.runtimeValue(
				() =>
					JSON.stringify(
						JSON.parse(fs.readFileSync(rootPackageJson, "utf8")).version
					),
				{
					fileDependencies: [rootPackageJson],
				}
			),
			APP_URL: JSON.stringify(process.env.CREATURE_CHESS_APP_URL),
			APP_API_URL: JSON.stringify(process.env.API_INFO_URL),
			APP_IMAGE_ROOT: JSON.stringify(process.env.CREATURE_CHESS_IMAGE_URL),
			APP_AUTH0_ENABLED: JSON.stringify(process.env.AUTH0_ENABLED),
			APP_AUTH0_DOMAIN: JSON.stringify(process.env.AUTH0_DOMAIN),
			APP_AUTH0_SPA_CLIENT_ID: JSON.stringify(process.env.AUTH0_SPA_CLIENT_ID),
		}),
		new HtmlWebpackPlugin({
			scriptLoading: "blocking",
		}),
		new CircularDependencyPlugin({
			// exclude detection of files based on a RegExp
			exclude: /a\.js|node_modules/,
			// add errors to webpack instead of warnings
			failOnError: true,
			// allow import cycles that include an asyncronous import,
			// e.g. via import(/* webpackMode: "weak" */ './file.js')
			allowAsyncCycles: false,
			// set the current working directory for displaying module paths
			cwd: process.cwd(),
		}),
	].filter((plugin) => plugin !== null),

	devServer: {
		compress: true,
		port: 8090,
		historyApiFallback: true,
		https: true,
		host: "creaturechess.local-dev.com",
	},

	optimization: {
		splitChunks: {
			chunks: "all",
		},
	},
};
