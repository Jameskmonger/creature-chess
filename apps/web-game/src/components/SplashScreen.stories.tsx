import type { Meta, StoryObj } from "@storybook/react";
import { SplashScreen } from "./SplashScreen";

const meta: Meta<typeof SplashScreen> = {
	title: "@creature-chess / SplashScreen",
	component: SplashScreen,
};
export default meta;

type Story = StoryObj<typeof SplashScreen>;

export const Default: Story = {
	args: {
	},
};
