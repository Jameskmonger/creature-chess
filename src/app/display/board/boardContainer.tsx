import * as React from "react";
import { Announcement } from "./announcement";
import { Bench } from "./bench";
import { Board } from "./board";
import { ReconnectModal } from "./reconnectModal";
import { VictoryOverlay } from "./victoryOverlay/victoryOverlay";

const BoardContainer: React.FunctionComponent = () => {
    return (
        <div className="group board-container">
            <div className="chessboard">
                <Board />

                <Announcement />
                <VictoryOverlay />
                <ReconnectModal />
            </div>

            <div className="bench">
                <Bench />
            </div>
        </div>
    );
};

export { BoardContainer };
