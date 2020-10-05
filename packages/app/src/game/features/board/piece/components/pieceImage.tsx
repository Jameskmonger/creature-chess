import * as React from "react";
import { useSelector } from "react-redux";
import { PieceModel } from "@creature-chess/models";
import { getPiece } from "@creature-chess/shared/player/pieceSelectors";
import { AppState } from "../../../../../store";
import { CreatureImage } from "../../../../../ui/display/creatureImage";

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
