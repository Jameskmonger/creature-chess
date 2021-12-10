/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");


module.exports = {
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "dev-tools-bundles.js",
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: "ts-loader",
			exclude: /node_modules/
		},
		{
			test: /\.scss$/,
			use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader", "sass-loader"]
		}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "app-[contenthash].css"
		}),
	],
	resolve: {
		plugins: [
			new TsConfigPathsPlugin()
		],
		extensions: [".js", ".jsx", ".ts", ".tsx"],
		fallback: {
			events: require.resolve("events/")
		}
	}
};
