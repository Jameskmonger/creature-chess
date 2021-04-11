import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PieceModel } from "@creature-chess/models";
import { PlayerActions, getPiece } from "@creature-chess/shared";
import { AppState } from "../../../../store";
import { Card } from "../../cardShop";

const selectedPieceSelector = (state: AppState): PieceModel =>
    state.ui.selectedPieceId
        ? getPiece(state.game, state.ui.selectedPieceId)
        : null;

const SellPieceButton: React.FunctionComponent<{ pieceId: string }> = ({ pieceId }) => {
    const dispatch = useDispatch();
    const [areYouSure, setAreYouSure] = React.useState<boolean>(false);

    const onClick = (
        areYouSure
        ? () => {
            dispatch(PlayerActions.playerSellPieceAction(pieceId));
        }
        : () => {
            setAreYouSure(true);
        }
    );

    React.useEffect(() => {
        setAreYouSure(false);
    }, [ pieceId ]);

    if (!areYouSure) {
        return <button className="ready-up" onClick={onClick}>Sell Piece</button>;
    }

    return <button className="ready-up" onClick={onClick}>Confirm?</button>;
};

const SelectedCreature: React.FunctionComponent = () => {
    const selectedPiece = useSelector<AppState, PieceModel>(selectedPieceSelector);

    if (!selectedPiece) {
        return null;
    }

    return (
        <>
            <SellPieceButton pieceId={selectedPiece.id} />
        </>
    );
};

export { SelectedCreature };
