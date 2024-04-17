import React from "react";

import { Meta, Story } from "@storybook/react";

import {
	Card as CardModel,
	CreatureType,
	DefinitionClass,
} from "@creature-chess/models";

import { Card } from "./card";
import "./card.stories.css";

export default {
<<<<<<< HEAD:modules/@cc-web/ui/src/cardShop/card.stories.tsx
	title: "@ui / Card Shop / Card",
=======
	title: "@cc-web / ui / CardShop / 3d / Card",
>>>>>>> ed8a6636 (feat: new 2d shop ui):modules/@cc-web/ui/src/cardShop/3d/card.stories.tsx
	component: Card,
} as Meta;

const Template: Story<any> = (args) => (
	<div className="card-story">
		<Card {...args} />
	</div>
);

const card: CardModel = {
	id: "1234",
	definitionId: 10,
	name: "Chenipode",
	type: CreatureType.Earth,
	class: DefinitionClass.CUNNING,
	cost: 2,
};

export const Chenipode = Template.bind({});
Chenipode.args = {
	card,
};
