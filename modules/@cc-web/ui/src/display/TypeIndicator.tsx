import * as React from "react";

import { CreatureType } from "@creature-chess/models";
import { IMAGE_BASE_URL } from "@cc-web/shared/constants";

interface TypeIndicatorProps {
	type: CreatureType;
}

function getIconUrl(iconName: string) {
	return `${IMAGE_BASE_URL}/ui/${iconName}`;
}

const ICON_FOR_TYPE = {
	[CreatureType.Fire]: getIconUrl("type-fire.svg"),
	[CreatureType.Earth]: getIconUrl("type-earth.svg"),
	[CreatureType.Metal]: getIconUrl("type-metal.svg"),
	[CreatureType.Water]: getIconUrl("type-water.svg"),
	[CreatureType.Wood]: getIconUrl("type-wood.svg"),
};

const TypeIndicator: React.FunctionComponent<TypeIndicatorProps> = ({
	type,
}) => <img src={ICON_FOR_TYPE[type]} />;

export { TypeIndicator };
