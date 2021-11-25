import React from "react";
import { Meta, Story } from "@storybook/react";

import { ProgressBar } from "./progressBar";
import "./ProgressBar.stories.css";

export default {
	title: "Display/ProgressBar",
	component: ProgressBar,
	argTypes: {
		current: {
			control: {
				type: "number"
			}
		},
		max: {
			control: {
				type: "number"
			}
		},
		vertical: {
			control: {
				type: "boolean"
			}
		},
		className: {
			control: {
				type: null
			}
		},
		fillClassName: {
			control: {
				type: null
			}
		},
		contentClassName: {
			control: {
				type: null
			}
		}
	},
} as Meta;

const renderContents = (current: number) => current.toString();

const Template: Story<any> = (args) => (
	<div className="progressbar-story">
		<ProgressBar {...args} renderContents={renderContents} className="healthbar" fillClassName="fill" contentClassName="contents" />
	</div>
);

export const Healthbar = Template.bind({});
Healthbar.args = {
	current: 20,
	max: 100
};
