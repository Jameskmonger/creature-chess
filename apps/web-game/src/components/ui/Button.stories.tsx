import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const meta: Meta<typeof Button> = {
	title: "@creature-chess / ui / Button",
	component: Button,
	args: {
		children: "Button",
		size: "medium",
		color: "primary",
	},
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		color: "primary",
	},
};

export const Secondary: Story = {
	args: {
		color: "secondary",
	},
};

export const Small: Story = {
	args: {
		size: "small",
	},
};

export const Medium: Story = {
	args: {
		size: "medium",
	},
};

export const Large: Story = {
	args: {
		size: "large",
	},
};

export const WithIcon: Story = {
	args: {
		children: <>Hello! <FontAwesomeIcon icon={faUsers} /></>
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
