import React from "react";

import { finishedBattle } from "@creature-chess/models";
import { StatusPlayerListItem } from "./statusPlayerListItem";

export default {
	title: "Player List/StatusPlayerListItem",
	component: StatusPlayerListItem
};

const Template = (args) => <div style={{ width: "400px" }}><StatusPlayerListItem {...args} /></div>;

export const DeadPlayer = Template.bind({});
DeadPlayer.args = {
	name: "JKM",
	opponentName: "Jeff",
	battle: finishedBattle("1234", true, 0, 3),
	status: "Dead",
	subtitle: "8th place"
};
