import type { Meta, StoryObj } from "@storybook/react";

import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
	title: "@creature-chess / ui / Spinner",
	component: Spinner,
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Large: Story = {
	args: { size: 96 },
};
