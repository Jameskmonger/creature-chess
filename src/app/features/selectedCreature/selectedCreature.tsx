import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@app/store";
import { PieceModel } from "@common/models";
import { getPiece } from "@common/player/pieceSelectors";
import { Card } from "../cardShop/card";
import { playerSellPiece } from "@common/player/actions";

const selectedPieceSelector = (state: AppState): PieceModel =>
    state.game.selectedPieceId
        ? getPiece(state, state.game.selectedPieceId)
        : null;

const SellPieceButton: React.FunctionComponent<{ pieceId: string }> = ({ pieceId }) => {
    const dispatch = useDispatch();
    const onClick = () => dispatch(playerSellPiece(pieceId));

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
