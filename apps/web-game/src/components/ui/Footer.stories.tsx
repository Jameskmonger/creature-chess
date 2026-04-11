import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
	title: "@creature-chess / ui / Footer",
	component: Footer,
	argTypes: {},
	render: () => (
		<div style={{ background: "grey", padding: "2em" }}>
			<Footer />
		</div>
	),
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
