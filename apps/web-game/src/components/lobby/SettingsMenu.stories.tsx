import type { Meta, StoryObj } from "@storybook/react";

import { SettingsMenu } from "./SettingsMenu";

const meta: Meta<typeof SettingsMenu> = {
	title: "@creature-chess / lobby / SettingsMenu",
	component: SettingsMenu,
};
export default meta;

type Story = StoryObj<typeof SettingsMenu>;

export const Default: Story = {
	args: {},
};
