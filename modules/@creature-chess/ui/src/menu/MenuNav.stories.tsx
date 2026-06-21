import * as React from "react";

import {
	faCircleQuestion,
	faHouse,
	faRankingStar,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react";

import { MenuNav } from "./MenuNav";

const items = [
	{ key: "home", label: "Home", icon: <FontAwesomeIcon icon={faHouse} /> },
	{ key: "ranks", label: "Ranks", icon: <FontAwesomeIcon icon={faRankingStar} /> },
	{ key: "profile", label: "Profile", icon: <FontAwesomeIcon icon={faUser} /> },
	{ key: "help", label: "Help", icon: <FontAwesomeIcon icon={faCircleQuestion} /> },
] as const;

const meta: Meta<typeof MenuNav> = {
	title: "@creature-chess / ui / menu / MenuNav",
	component: MenuNav,
	decorators: [
		(Story) => (
			<div style={{ maxWidth: 380 }}>
				<Story />
			</div>
		),
	],
};
export default meta;

type Story = StoryObj<typeof MenuNav<typeof items>>;

export const Home: Story = {
	args: { items, active: "home" },
};

export const Profile: Story = {
	args: { items, active: "profile" },
};
