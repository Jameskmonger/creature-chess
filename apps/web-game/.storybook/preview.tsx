import React from "react";

import type { Preview } from "@storybook/react";

import { GameStateProvider } from "./GameStateProvider";

const preview: Preview = {
	decorators: [
		(Story, context) => (
			<GameStateProvider>
				<Story {...context.args} />
			</GameStateProvider>
		),
	],
};

export default preview;
