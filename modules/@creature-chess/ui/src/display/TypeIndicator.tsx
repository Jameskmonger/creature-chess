import * as React from "react";
import { CreatureType } from "@creature-chess/models";

interface TypeIndicatorProps {
	type: CreatureType;
	className?: string;
}

const ICON_FOR_TYPE = {
	[CreatureType.Fire]: "http://creaturechess.com/images/ui/type-fire.svg",
	[CreatureType.Earth]: "http://creaturechess.com/images/ui/type-earth.svg",
	[CreatureType.Metal]: "http://creaturechess.com/images/ui/type-metal.svg",
	[CreatureType.Water]: "http://creaturechess.com/images/ui/type-water.svg",
	[CreatureType.Wood]: "http://creaturechess.com/images/ui/type-wood.svg"
};

const TypeIndicator: React.FunctionComponent<TypeIndicatorProps> = ({ type, className }) => <img className={className} src={ICON_FOR_TYPE[type]} />;

export { TypeIndicator };
