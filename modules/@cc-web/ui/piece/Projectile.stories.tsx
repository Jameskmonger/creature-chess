import React from "react";

import { Meta, Story } from "@storybook/react";

import { Projectile } from "./Projectile";

export default {
	title: "@ui / Piece / Projectile",
	component: Projectile,
	argTypes: {},
} as Meta;

const Template: Story<any> = (args) => <Projectile />;

export const Default = Template.bind({});
Default.args = {};
