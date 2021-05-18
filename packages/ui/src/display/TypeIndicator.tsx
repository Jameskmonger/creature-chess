import * as React from "react";
import { CreatureType } from "@creature-chess/models";

interface TypeIndicatorProps {
	type: CreatureType;
}

const ICON_FOR_TYPE = {
	[CreatureType.Fire]: "http://creaturechess.jamesmonger.com/images/ui/type-fire.svg",
	[CreatureType.Earth]: "http://creaturechess.jamesmonger.com/images/ui/type-earth.svg",
	[CreatureType.Metal]: "http://creaturechess.jamesmonger.com/images/ui/type-metal.svg",
	[CreatureType.Water]: "http://creaturechess.jamesmonger.com/images/ui/type-water.svg",
	[CreatureType.Wood]: "http://creaturechess.jamesmonger.com/images/ui/type-wood.svg"
};

const TypeIndicator: React.FunctionComponent<TypeIndicatorProps> = ({ type }) => <img src={ICON_FOR_TYPE[type]} />;

export { TypeIndicator };
