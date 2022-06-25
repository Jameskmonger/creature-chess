import React from "react";

import { Meta, Story } from "@storybook/react";

import { Footer } from "./Footer";

export default {
	title: "Footer",
	component: Footer,
	argTypes: {},
} as Meta;

const Template: Story<any> = (args) => (
	<div style={{ background: "grey", padding: "2em" }}>
		<Footer />
	</div>
);

export const Default = Template.bind({});
Default.args = {};
