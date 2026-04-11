import type { Meta, StoryObj } from "@storybook/react";

import { LoadingBar } from "./LoadingBar";

const meta: Meta<typeof LoadingBar> = {
	title: "@creature-chess / LoadingBar",
	component: LoadingBar,
};
export default meta;

type Story = StoryObj<typeof LoadingBar>;

export const Default: Story = {
	args: {},
};
