import { Meta, StoryObj } from "@storybook/react";

import { LoadingScreen } from "./LoadingScreen";

const meta: Meta<typeof LoadingScreen> = {
	title: "@creature-chess / ui / LoadingScreen",
	component: LoadingScreen,
};

export default meta;

type Story = StoryObj<typeof LoadingScreen>;

export const Loading: Story = {
	args: {
		message: "Pro tip: Combine identical creatures to level them up!",
		logoSrc: "https://placehold.co/400x200?text=Creature+Chess+Logo",
	},
};
