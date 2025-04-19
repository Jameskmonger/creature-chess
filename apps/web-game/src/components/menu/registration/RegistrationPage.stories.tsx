import React from "react";

import { Meta, Story } from "@storybook/react";

import { RegistrationPage } from "./RegistrationPage";

export default {
	title: "@creature-chess / menu / RegistrationPage",
	component: RegistrationPage,
	argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof RegistrationPage>> = (
	args
) => <RegistrationPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
