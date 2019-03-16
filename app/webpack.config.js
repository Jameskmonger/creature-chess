const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');

const outDir = path.resolve(__dirname, "bin");

module.exports = {
    mode: "development",

    entry: "./src/index.tsx",

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "tslint-loader",
                enforce: "pre"
            },
            {
                test: /\.tsx?$/,
                use: "awesome-typescript-loader",
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [ { loader: MiniCssExtractPlugin.loader }, "css-loader", "sass-loader" ]
            }
        ]
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },

    output: {
        filename: "bundle.js",
        path: outDir
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "app.css"
        }),
        new StyleLintPlugin({
            files: "**/*.scss"
        })
    ],

    devServer: {
        contentBase: outDir,
        compress: true,
        port: 8090
    },

    optimization: {
        splitChunks: {
            chunks: "all"
        }
    }
};
