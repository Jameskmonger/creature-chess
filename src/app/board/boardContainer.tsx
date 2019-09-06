import * as React from "react";
import { Announcement } from './announcement';
import { Bench } from './bench';
import { Board } from './board';
import { Constants } from '@common';
import { ReconnectModal } from './reconnectModal';
import { useWindowSize } from '../use-window-size';

const getWidthFromHeight = (height: number) =>
    ((height / (Constants.GRID_SIZE + 1)) * Constants.GRID_SIZE);
const getHeightFromWidth = (width: number) =>
    ((width / Constants.GRID_SIZE) * (Constants.GRID_SIZE + 1));

const BoardContainer: React.FunctionComponent = () => {
    const { width, height } = useWindowSize();

    const portrait = width < height;

    const boardMargin = 15;
    const marginDelta = boardMargin * 3.1;

    const boardContainerStyle = {
        height:
            portrait
                ? (getHeightFromWidth(width) - marginDelta) + "px"
                : (height - marginDelta) + "px",
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

            <ReconnectModal />
        </div>
    );
}

export { BoardContainer };