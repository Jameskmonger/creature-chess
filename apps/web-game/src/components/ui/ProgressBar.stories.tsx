import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import "./ProgressBar.stories.css";
import { ProgressBar } from "./progressBar";

const renderContents = (current: number) => current.toString();

const meta: Meta<typeof ProgressBar> = {
	title: "@creature-chess / ui / ProgressBar",
	component: ProgressBar,
	argTypes: {
		current: {
			control: {
				type: "number",
			},
		},
		max: {
			control: {
				type: "number",
			},
		},
		vertical: {
			control: {
				type: "boolean",
			},
		},
		className: {
			control: {
				type: null,
			},
		},
		fillClassName: {
			control: {
				type: null,
			},
		},
		contentClassName: {
			control: {
				type: null,
			},
		},
	},
	render: (args) => (
		<div className="progressbar-story">
			<ProgressBar
				{...args}
				renderContents={renderContents}
				className="healthbar"
				fillClassName="fill"
				contentClassName="contents"
			/>
		</div>
	),
};
export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Healthbar: Story = {
	args: {
		current: 20,
		max: 100,
	},
};
