/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const { DefinePlugin, EnvironmentPlugin } = require("webpack");

const outDir = path.resolve(__dirname, "public");

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
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader", "sass-loader"]
			},
			{
				test: /\.css$/,
				use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"]
			}
		]
	},

	resolve: {
		plugins: [
			new TsConfigPathsPlugin()
		],
		extensions: [".tsx", ".ts", ".js"]
	},

	output: {
		filename: "bundle-[contenthash].js",
		path: outDir
	},

	plugins: [
		new EnvironmentPlugin({
			NODE_ENV: "production",
			SENTRY_DSN: "",
		}),
		new DefinePlugin({
			APP_VERSION: JSON.stringify(require("../../package.json").version)
		}),
		new HtmlWebpackPlugin({
			scriptLoading: "blocking"
		}),
		new MiniCssExtractPlugin({
			filename: "app-[contenthash].css"
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
	].filter(plugin => plugin !== null),

	devServer: {
		compress: true,
		port: 8090,
		historyApiFallback: true,
		https: true,
		host: "creaturechess.local-dev.com"
	},

	optimization: {
		splitChunks: {
			chunks: "all"
		}
	}
};
