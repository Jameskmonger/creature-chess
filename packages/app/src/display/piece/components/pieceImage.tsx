import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import { PieceModel } from "@creature-chess/shared/models";
import { getPiece } from "@creature-chess/shared/player/pieceSelectors";
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
