const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outDir = path.resolve(__dirname, "bin");

module.exports = {
    mode: "development",

    entry: "./src/index.tsx",

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "awesome-typescript-loader",
                exclude: /node_modules/
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
        })
    ]
};
