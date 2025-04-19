import React from "react";

import type { Preview } from "@storybook/react";
import { DecoratorFunction } from "@storybook/types";

import webGamePreview from "../apps/web-game/.storybook/preview";

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
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
