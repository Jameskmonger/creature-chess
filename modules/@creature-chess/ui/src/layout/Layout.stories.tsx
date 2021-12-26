import React from "react";
import { Meta, Story } from "@storybook/react";
import { createUseStyles } from "react-jss";
import classNames from "classnames";

import { Layout } from "./layout";
import { Half } from "./half";
import "./Layout.stories.css";

export default {
	title: "Layout",
} as Meta;

const useStyles = createUseStyles({
	layout: {
		border: "2px solid blue"
	},
	half: {
		border: "2px solid red"
	},
	columnLayout: {
		height: "400px"
	},
	layoutStory: {
		maxWidth: "600px",
		maxHeight: "600px",
	},
});

const Template: Story<any> = (args) => {
	const classes = useStyles();

	if (args.row) {
		return (
			<div className="layout-story">
				<Layout direction="row" className={classes.layout}>
					<Half className={classes.half}>Half A</Half>
					<Half className={classes.half}>Half B</Half>
				</Layout>
			</div>
		);
	}

	return (
		<div className="layout-story">
			<Layout direction="column" className={classNames(classes.layout, classes.columnLayout)}>
				<Half className={classes.half}>Half A</Half>
				<Half className={classes.half}>Half B</Half>
			</Layout>
		</div>
	);
};

export const RowLayout = Template.bind({});
RowLayout.args = { row: true };

export const ColumnLayout = Template.bind({});
ColumnLayout.args = { row: false };
