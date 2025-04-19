import React from "react";

import { Meta, Story } from "@storybook/react";

import { LoginPage } from "./LoginPage";

export default {
	title: "@creature-chess / menu / LoginPage",
	component: LoginPage,
	argTypes: {
		updateUser: { action: "updateUser" },
	},
} as Meta;

const Template: Story<React.ComponentProps<typeof LoginPage>> = (args) => (
	<LoginPage {...args} />
);

export const Default = Template.bind({});
Default.args = {};
