import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@app/store";
import { PieceModel } from "@common/models";
import { getPiece } from "@common/player/pieceSelectors";
import { CreatureImage } from "../../creatureImage";

interface PieceImageProps {
    pieceId: string;
}

const PieceImage: React.FunctionComponent<PieceImageProps> = ({ pieceId }) => {
    const piece = useSelector<AppState, (PieceModel | null)>(state => getPiece(state, pieceId));

    if (!piece) {
        return null;
    }

    return <CreatureImage definitionId={piece.definitionId} facing={piece.facingAway ? "back" : "front"} />;
};

export { PieceImage };
