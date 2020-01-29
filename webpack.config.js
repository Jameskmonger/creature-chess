const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");
const CircularDependencyPlugin = require("circular-dependency-plugin");

const getGAScript = (id) => {
    if (!id) {
        return "";
    }

    return `    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', '${id}');
    </script>`;
};

const outDir = path.resolve(__dirname, "public");

module.exports = {
    mode: "development",
    devtool: false,

    entry: "./src/app/index.tsx",

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
        new HtmlWebpackPlugin({
            template: "./src/app/index.ejs",
            templateParameters: () => {
                return {
                    googleAnalyticsScript: getGAScript(process.env.GA_ID)
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: "app.css"
        }),
        new StyleLintPlugin({
            files: "**/*.scss"
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
