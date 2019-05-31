import * as React from "react";

interface Props {
    definitionId: number;
    stage: number;
    facing?: "front" | "back";
}

const CreatureImage: React.FunctionComponent<Props> = ({ facing, definitionId, stage }) => (
    <img className="image" src={`/images/${facing || "front"}/${definitionId}_${stage}.png`} />
);

export { CreatureImage };
