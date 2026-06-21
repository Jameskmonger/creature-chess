import * as React from "react";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react";

import { AccountPill } from "./AccountPill";

const meta: Meta<typeof AccountPill> = {
	title: "@creature-chess / ui / menu / AccountPill",
	component: AccountPill,
};
export default meta;

type Story = StoryObj<typeof AccountPill>;

export const Guest: Story = {
	args: {
		name: "Guest",
		icon: <FontAwesomeIcon icon={faUser} />,
	},
};

export const SignedIn: Story = {
	args: {
		name: "jkm",
		avatar: <img src="/images/ui/logo.png" alt="avatar" />,
	},
};

export const LongName: Story = {
	args: {
		name: "averyverylongnickname",
		icon: <FontAwesomeIcon icon={faUser} />,
	},
};
