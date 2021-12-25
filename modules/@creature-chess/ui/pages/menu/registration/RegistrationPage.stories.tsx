import React from "react";
import { Meta, Story } from "@storybook/react";

import { RegistrationPage } from "./RegistrationPage";
import { RegistrationPageContextProvider, RegistrationPageInfo } from "./RegistrationPageContext";

export default {
	title: "Pages/MenuPage/RegistrationPage",
	component: RegistrationPage,
	argTypes: {
		updateUser: { action: "updateUser" },
	}
} as Meta;

const Template: Story<RegistrationPageInfo> = ({ updateUser }) => (
	<RegistrationPageContextProvider value={{ updateUser }}>
		<RegistrationPage />
	</RegistrationPageContextProvider>
);

export const Default = Template.bind({});
Default.args = {
};
