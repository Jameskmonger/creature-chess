import type { Meta, StoryObj } from "@storybook/react";
import { MenuPage } from "./MenuPage";

const meta: Meta<typeof MenuPage> = {
	title: "@creature-chess / MenuPage",
	component: MenuPage,
};
export default meta;

type Story = StoryObj<typeof MenuPage>;

export const Default: Story = {
	args: {
	},
};
