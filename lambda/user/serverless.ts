import { getCurrentUser, updateCurrentUser } from "@functions/index";
import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
	service: "user",
	frameworkVersion: "3",
	plugins: ["serverless-esbuild"],
	provider: {
		name: "aws",
		runtime: "nodejs14.x",
		region: "eu-west-1",
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
			NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",

			AUTH0_MANAGEMENT_CLIENT_SECRET: "${env:AUTH0_MANAGEMENT_CLIENT_SECRET}",
			CREATURE_CHESS_FAUNA_KEY: "${env:CREATURE_CHESS_FAUNA_KEY}",
		},
	},
	// import the function via paths
	functions: { getCurrentUser, updateCurrentUser },
	package: { individually: true },
	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ["aws-sdk", "superagent-proxy"],
			target: "node14",
			define: { "require.resolve": undefined },
			platform: "node",
			concurrency: 10,
		},
	},
};

module.exports = serverlessConfiguration;
