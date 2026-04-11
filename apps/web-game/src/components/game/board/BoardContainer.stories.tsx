import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { BoardContainer } from "./BoardContainer";

const meta: Meta<any> = {
	title: "@creature-chess / game / Board / BoardContainer",
	component: BoardContainer,
	argTypes: {},
	render: () => (
		<div
			style={{
				width: "500px",
				height: "400px",
				border: "2px solid red",
			}}
		>
			<BoardContainer />
		</div>
	),
};
export default meta;

type Story = StoryObj<any>;

export const Scale_Height: Story = {
	args: {
		scaleMode: "height",
	},
};

export const Scale_Width: Story = {
	args: {
		scaleMode: "width",
	},
};
