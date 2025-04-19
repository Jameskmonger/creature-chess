import React from "react";

import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import type { Preview } from "@storybook/react";
import { DecoratorFunction } from "@storybook/types";

import webGamePreview from "../apps/web-game/.storybook/preview";

const viewports = Object.entries(INITIAL_VIEWPORTS)
	.filter(([key]) =>
		[
			"pixel",
			"pixelxl",
			"iphone5",
			"iphone6",
			"ipad",
			"ipad10p",
			"ipad12p",
		].includes(key)
	)
	.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		viewport: {
			viewports: {
				...viewports,
				["pixel6"]: {
					name: "Pixel 6",
					styles: {
						width: "412px",
						height: "915px",
					},
					type: "mobile",
				},
				["pixel5"]: {
					name: "Pixel 5",
					styles: {
						width: "393px",
						height: "851px",
					},
					type: "mobile",
				},
			},
		},
	},
	decorators: [
		(Story, context) => {
			if (context.title.startsWith("@creature-chess")) {
				if (typeof webGamePreview.decorators === "undefined") {
					return <Story {...context.args} />;
				}

				if (typeof webGamePreview.decorators === "function") {
					return webGamePreview.decorators(Story, context);
				}

				const decorators =
					(webGamePreview.decorators as DecoratorFunction<any, any>[]) ?? [];

				// Apply decorators manually
				let decorated = Story;
				for (const decorator of decorators) {
					decorated = (
						(prev) => (ctx) =>
							decorator(() => prev(ctx), ctx as any)
					)(decorated);
				}

				return decorated(context); // ✅ MUST call the final composed function
			}

			return <Story {...context} />; // ✅ Correctly render Story as a component
		},
	],
};

export default preview;
