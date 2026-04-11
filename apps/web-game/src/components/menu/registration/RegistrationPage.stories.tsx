import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { RegistrationPage } from "./RegistrationPage";

const meta: Meta<typeof RegistrationPage> = {
	title: "@creature-chess / menu / RegistrationPage",
	component: RegistrationPage,
	argTypes: {},
};
export default meta;

type Story = StoryObj<typeof RegistrationPage>;

export const Default: Story = {};
