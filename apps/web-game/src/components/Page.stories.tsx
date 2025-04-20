import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { createUseStyles } from "react-jss";

import { Page } from "./Page";

const meta: Meta<typeof Page> = {
	title: "@creature-chess / Page",
	component: Page,
};
export default meta;

type Story = StoryObj<typeof Page>;

const useLandingStyles = createUseStyles({
	landing: {
		color: "#fff",
	},
});

function StorybookLandingPage() {
	const classes = useLandingStyles();
	return (
		<div className={classes.landing}>
			<h1>Hello!</h1>
			<p>Welcome to Storybook.</p>
		</div>
	);
}

export const Default: Story = {
	args: {
		children: <StorybookLandingPage />,
		hasBackground: true,
	},
};

export const NoBackground: Story = {
	args: {
		children: <StorybookLandingPage />,
		hasBackground: false,
	},
};
