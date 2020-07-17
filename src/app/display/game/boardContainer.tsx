import * as React from "react";
import { Board } from "../board/board";
import { Bench } from "../bench";

const BoardContainer: React.FunctionComponent = () => {
    return (
        <div className="group board-container">
            <Board />

            <Bench />
        </div>
    );
};

export { BoardContainer };
