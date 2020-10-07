import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PieceModel } from "@creature-chess/models";
import { PlayerActions, getPiece } from "@creature-chess/shared";
import { AppState } from "../../../../store";
import { Card } from "../../cardShop";

const selectedPieceSelector = (state: AppState): PieceModel =>
    state.ui.selectedPieceId
        ? getPiece(state, state.ui.selectedPieceId)
        : null;

const SellPieceButton: React.FunctionComponent<{ pieceId: string }> = ({ pieceId }) => {
    const dispatch = useDispatch();
    const onClick = () => dispatch(PlayerActions.playerSellPiece(pieceId));

    return <button className="ready-up" onClick={onClick}>Sell Piece</button>;
};

const SelectedCreature: React.FunctionComponent = () => {
    const selectedPiece = useSelector<AppState, PieceModel>(selectedPieceSelector);

    if (!selectedPiece) {
        return null;
    }

    return (
        <>
            <Card definitionId={selectedPiece.definitionId} buyable={false} fullWidth />

            <SellPieceButton pieceId={selectedPiece.id} />
        </>
    );
};

export { SelectedCreature };
