import * as React from "react";

import { faChevronRight, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react";

import { MenuBanner } from "./MenuBanner";

const meta: Meta<typeof MenuBanner> = {
	title: "@creature-chess / ui / menu / MenuBanner",
	component: MenuBanner,
	decorators: [
		(Story) => (
			<div style={{ maxWidth: 360 }}>
				<Story />
			</div>
		),
	],
};
export default meta;

type Story = StoryObj<typeof MenuBanner>;

export const WhatsNew: Story = {
	args: {
		icon: <FontAwesomeIcon icon={faNewspaper} />,
		label: "What's new",
		suffix: "version 1.2.3",
		chevron: <FontAwesomeIcon icon={faChevronRight} />,
	},
};
