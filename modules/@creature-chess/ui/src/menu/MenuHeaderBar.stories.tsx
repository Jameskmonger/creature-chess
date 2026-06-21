import * as React from "react";

import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react";

import { AccountPill } from "./AccountPill";
import { MenuHeaderBar } from "./MenuHeaderBar";

const logo = <img src="/images/ui/logo.png" alt="Creature Chess" />;
const settings = <FontAwesomeIcon icon={faGear} />;

const meta: Meta<typeof MenuHeaderBar> = {
	title: "@creature-chess / ui / menu / MenuHeaderBar",
	component: MenuHeaderBar,
	decorators: [
		(Story) => (
			<div style={{ maxWidth: 420 }}>
				<Story />
			</div>
		),
	],
};
export default meta;

type Story = StoryObj<typeof MenuHeaderBar>;

export const Guest: Story = {
	args: {
		brand: logo,
		settingsIcon: settings,
		account: <AccountPill name="Guest" icon={<FontAwesomeIcon icon={faUser} />} />,
	},
};

export const SignedIn: Story = {
	args: {
		brand: logo,
		settingsIcon: settings,
		account: (
			<AccountPill
				name="jkm"
				rank="Gold II"
				avatar={<img src="/images/ui/logo.png" alt="avatar" />}
			/>
		),
	},
};
