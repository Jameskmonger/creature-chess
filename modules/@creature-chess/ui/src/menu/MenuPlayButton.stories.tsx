import * as React from "react";

import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react";

import { MenuPlayButton } from "./MenuPlayButton";

const meta: Meta<typeof MenuPlayButton> = {
	title: "@creature-chess / ui / menu / MenuPlayButton",
	component: MenuPlayButton,
	decorators: [
		(Story) => (
			<div style={{ maxWidth: 360 }}>
				<Story />
			</div>
		),
	],
};
export default meta;

type Story = StoryObj<typeof MenuPlayButton>;

export const Default: Story = {
	args: {
		icon: <FontAwesomeIcon icon={faPlay} />,
		title: "Quick play",
		subtitle: "Casual · 8 players",
	},
};
