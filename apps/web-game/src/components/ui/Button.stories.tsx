import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
	title: "@creature-chess / ui / Button",
	component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		children: "Button",
		size: "medium",
		type: "primary",
	},
};

export const Secondary: Story = {
	args: {
		children: "Button",
		size: "medium",
		type: "secondary",
	},
};
