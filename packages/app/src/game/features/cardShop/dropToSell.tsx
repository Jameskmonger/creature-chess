import * as React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { PlayerActions } from "@creature-chess/shared";

const DropToSell: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const [{ }, drop] = useDrop({
        accept: "Piece",
        drop: item => dispatch(PlayerActions.playerSellPieceAction((item as any).piece.id)),
    });

    return (
        <div ref={drop} className="drop-to-sell">
            <span className="drop-to-sell-text">Drop piece here to sell</span>
        </div>
    );
};

export {
    DropToSell
};
