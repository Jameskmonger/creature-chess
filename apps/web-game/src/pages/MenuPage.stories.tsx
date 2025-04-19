import React from "react";

import { Meta, Story } from "@storybook/react";

import { MenuPage } from "./menu";

export default {
	title: "@ui / Pages / MenuPage",
	component: MenuPage,
} as Meta;

const Template: Story = () => <MenuPage />;

export const Default = Template.bind({});
Default.args = {};
