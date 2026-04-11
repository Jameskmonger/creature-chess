import type { Meta, StoryObj } from "@storybook/react";

import { GameMenu } from "./GameMenu";

const meta: Meta<typeof GameMenu> = {
	title: "@creature-chess / menu / GameMenu",
	component: GameMenu,
};
export default meta;

type Story = StoryObj<typeof GameMenu>;

export const Default: Story = {
	args: {},
};
