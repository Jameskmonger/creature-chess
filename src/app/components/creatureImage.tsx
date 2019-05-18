import * as React from "react";

interface Props {
    definitionId: number;
    facing?: "front" | "back";
}

const CreatureImage: React.FunctionComponent<Props> = (props) => (
    <img className="image" src={`/images/${props.facing || "front"}/${props.definitionId}.png`} />
);

export { CreatureImage };
