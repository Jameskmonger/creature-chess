import * as React from "react";
import { Announcement } from "./announcement";
import { Bench } from "./bench";
import { Board } from "./board";
import { Constants } from "@common/models";
import { ReconnectModal } from "./reconnectModal";
import { useWindowSize } from "../../use-window-size";
import { VictoryOverlay } from "./victoryOverlay/victoryOverlay";

const getWidthFromHeight = (height: number) =>
    ((height / (Constants.GRID_SIZE + 1)) * Constants.GRID_SIZE);
const getHeightFromWidth = (width: number) =>
    ((width / Constants.GRID_SIZE) * (Constants.GRID_SIZE + 1));

const BoardContainer: React.FunctionComponent = () => {
    const { width, height } = useWindowSize();

    const portrait = width < height;

    const boardMargin = 15;
    const marginDelta = boardMargin * 3.1;

    const BOARD_TO_BENCH_SPACE_PX = 12;

    const boardContainerStyle = {
        height:
            portrait
                ? (getHeightFromWidth(width) - marginDelta + BOARD_TO_BENCH_SPACE_PX) + "px"
                : (height - marginDelta + BOARD_TO_BENCH_SPACE_PX) + "px",
        width:
            portrait
                ? (width - marginDelta) + "px"
                : (getWidthFromHeight(height) - marginDelta) + "px"
    };

    return (
        <div className="group board-container" style={boardContainerStyle}>
            <div className="chessboard">
                <Board />
                <Bench />
            </div>

            <Announcement />
            <VictoryOverlay />
            <ReconnectModal />
        </div>
    );
};

export { BoardContainer };
