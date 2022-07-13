import * as React from "react";

import { CreatureType } from "@creature-chess/models";

interface TypeIndicatorProps {
	type: CreatureType;
}

const ICON_FOR_TYPE = {
	[CreatureType.Fire]: "images/ui/type-fire.svg",
	[CreatureType.Earth]: "images/ui/type-earth.svg",
	[CreatureType.Metal]: "images/ui/type-metal.svg",
	[CreatureType.Water]: "images/ui/type-water.svg",
	[CreatureType.Wood]: "images/ui/type-wood.svg",
};

const TypeIndicator: React.FunctionComponent<TypeIndicatorProps> = ({
	type,
}) => <img src={"https://creaturechess.com/game/" + ICON_FOR_TYPE[type]} />;

export { TypeIndicator };
