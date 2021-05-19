import * as React from "react";

interface Props {
	baseUrl?: string;
	definitionId: number;
	facing?: "front" | "back";
}

const CreatureImage: React.FunctionComponent<Props> = ({ baseUrl = "", facing, definitionId }) => (
	<img className="image creature-image" src={`${baseUrl}/images/${facing || "front"}/${definitionId}.png`} />
);

export { CreatureImage };
