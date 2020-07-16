import * as React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { playerSellPiece } from "@common/player/actions";

const DropToSell: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const [{ }, drop] = useDrop({
        accept: "Piece",
        drop: item => dispatch(playerSellPiece((item as any).piece.id)),
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
