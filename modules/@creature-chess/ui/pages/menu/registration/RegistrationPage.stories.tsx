import React from "react";
import { Meta, Story } from "@storybook/react";

import { RegistrationPage } from "./RegistrationPage";

export default {
	title: "Pages/MenuPage/RegistrationPage",
	component: RegistrationPage,
	argTypes: {
		updateUser: { action: "updateUser" },
	}
} as Meta;

const Template: Story<React.ComponentProps<typeof RegistrationPage>> = (args) => <RegistrationPage {...args} />;

export const Default = Template.bind({});
Default.args = {
};
