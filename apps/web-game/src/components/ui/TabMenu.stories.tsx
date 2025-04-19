import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { TabMenu } from "./TabMenu";

const meta: Meta<typeof TabMenu> = {
	title: "@cc-web / ui / components / TabMenu",
	component: TabMenu,
};
export default meta;

type Story = StoryObj<typeof TabMenu>;

export const Default: Story = {
	args: {
		tabs: [
			{
				label: "Tab 1",
				content: <div>Content for Tab 1</div>,
			},
			{
				label: "Tab 2",
				content: <div>Content for Tab 2</div>,
			},
			{
				label: "Tab 3",
				content: <div>Content for Tab 3</div>,
			},
		],
	},
};
