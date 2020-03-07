import * as React from "react";

interface Props {
    definitionId: number;
    facing?: "front" | "back";
}

const CreatureImage: React.FunctionComponent<Props> = ({ facing, definitionId }) => (
    <img className="image" src={`images/${facing || "front"}/${definitionId}_0.png`} />
);

export { CreatureImage };
