/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const CnameWebpackPlugin = require("cname-webpack-plugin");
const { DefinePlugin, EnvironmentPlugin } = require("webpack");

const getCookiebotScript = (id) => {
	if (!id) {
		return "";
	}

	return `<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="${id}" data-blockingmode="auto" type="text/javascript"></script>`;
};

const getGAScript = (id) => {
	if (!id) {
		return "";
	}

	return `    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${id}" data-cookieconsent="statistics"></script>
    <script data-cookieconsent="statistics">
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', '${id}');
    </script>`;
};

// we need to inject some redirect magic if deploying to GitHub pages
const getGHPagesRedirectScript = (enabled) => {
	if (!enabled) {
		return "";
	}

	return `    <!-- Single Page Apps for GitHub Pages -->
    <script type="text/javascript">
        // Single Page Apps for GitHub Pages
        // https://github.com/rafrex/spa-github-pages
        // Copyright (c) 2016 Rafael Pedicini, licensed under the MIT License
        // ----------------------------------------------------------------------
        // This script checks to see if a redirect is present in the query string
        // and converts it back into the correct url and adds it to the
        // browser's history using window.history.replaceState(...),
        // which won't cause the browser to attempt to load the new url.
        // When the single page app is loaded further down in this file,
        // the correct url will be waiting in the browser's history for
        // the single page app to route accordingly.
        (function(l) {
            if (l.search) {
                var q = {};
                l.search.slice(1).split('&').forEach(function(v) {
                    var a = v.split('=');
                    q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
                });
                if (q.p !== undefined) {
                    window.history.replaceState(null, null,
                        l.pathname.slice(0, -1) + (q.p || '') +
                        (q.q ? ('?' + q.q) : '') +
                        l.hash
                    );
                }
            }
        }(window.location))
    </script>`;
};

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
		extensions: [".tsx", ".ts", ".js"],
		fallback: {
			events: require.resolve("events/")
		}
	},

	output: {
		filename: "bundle-[contenthash].js",
		path: outDir
	},

	plugins: [
		new EnvironmentPlugin({
			NODE_ENV: "production",
			SENTRY_DSN: ""
		}),
		new DefinePlugin({
			APP_VERSION: JSON.stringify(require("./package.json").version)
		}),
		new HtmlWebpackPlugin({
			template: "./index.ejs",
			templateParameters: () => ({
				googleAnalyticsScript: getGAScript(process.env.GA_ID),
				ghPagesRedirectScript: getGHPagesRedirectScript(process.env.GH_PAGES),
				cookiebotScript: getCookiebotScript(process.env.COOKIEBOT_ID)
			}),
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
		process.env.CNAME
			? new CnameWebpackPlugin({ domain: process.env.CNAME })
			: null
	].filter(plugin => plugin !== null),

	devServer: {
		contentBase: outDir,
		compress: true,
		port: 8090,
		historyApiFallback: true,
		disableHostCheck: true,
		https: true,
		host: "creaturechess.local-dev.com"
	},

	optimization: {
		splitChunks: {
			chunks: "all"
		}
	}
};
