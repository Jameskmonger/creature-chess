import React from "react";
import { Meta, Story } from "@storybook/react";

import { Projectile } from "./projectile";

export default {
	title: "Piece/Projectile",
	component: Projectile,
	argTypes: {

	}
} as Meta;

const Template: Story<any> = (args) => <Projectile />;

export const Default = Template.bind({});
Default.args = {
};
