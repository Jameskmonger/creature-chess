import { PlayerTitle } from "@creature-chess/models";
import React from 'react';

import { Title } from "../../src/player";
import "./title.stories.css";

export default {
	title: 'Player/Title',
	component: Title,
	argTypes: {
	}
};

const Template = (args) => <div className="title-story"><Title {...args} size="large" /></div>;

export const Developer = Template.bind({});
Developer.args = {
	titleId: PlayerTitle.Developer
};

export const Contributor = Template.bind({});
Contributor.args = {
	titleId: PlayerTitle.Contributor
};

export const HallOfFame = Template.bind({});
HallOfFame.args = {
	titleId: PlayerTitle.HallOfFame
};
