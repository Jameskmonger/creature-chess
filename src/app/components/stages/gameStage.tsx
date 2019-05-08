// tslint:disable:jsx-ban-props
import * as React from "react";
import { DragDropContext } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/lib/HTML5toTouch";

import { Constants } from "@common";
import { Board } from "../board/board";
import { Bench } from "../board/bench";
import { CardShop } from "../cards/cardShop";
import { SelectedPieceInfoPanel } from "../selectedPieceInfo/selectedPieceInfoPanel";
import { PlayerList } from "../playerList/playerList";

import Media from "react-media";
import { PhaseInfo } from "../phase-info";
import { Profile } from "../profile/profile";

const getWidthFromHeight = (height: number) =>
    ((height / (Constants.GRID_SIZE + 1)) * Constants.GRID_SIZE);
const getHeightFromWidth = (width: number) =>
    ((width / Constants.GRID_SIZE) * (Constants.GRID_SIZE + 1));

interface GameStageProps {
    width: number;
    height: number;
}

class GameStageUnconnected extends React.Component<GameStageProps> {
    public render() {
        const { width, height } = this.props;
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
            <>
                <Media query="(orientation: landscape) and (min-width: 1200px)">
                    <div className="game landscape">
                        <div className="group">
                            <PhaseInfo />

                            <PlayerList />

                            <SelectedPieceInfoPanel />
                        </div>
                        <div className="group board-container" style={boardContainerStyle}>
                            <div className="chessboard">
                                <Board />
                                <Bench />
                            </div>
                        </div>
                        <div className="group">
                            <Profile />
                            <CardShop />
                        </div>
                    </div>
                </Media>

                <Media query="(orientation: landscape) and (max-width: 1199px) and (min-width: 1000px)">
                    <div className="game landscape">
                        <div className="group board-container" style={boardContainerStyle}>
                            <div className="chessboard">
                                <Board />
                                <Bench />
                            </div>
                        </div>
                        <div className="group">
                            <SelectedPieceInfoPanel />

                            <PhaseInfo />

                            <Profile />

                            <PlayerList />

                            <CardShop />
                        </div>
                    </div>
                </Media>

                <Media query="(orientation: portrait), (max-width: 999px)">
                    <div className="game portrait">
                        <div className="group board-container" style={boardContainerStyle}>
                            <div className="chessboard">
                                <Board />
                                <Bench />
                            </div>
                        </div>
                        <div className="group">
                            <SelectedPieceInfoPanel />

                            <PhaseInfo />

                            <Profile />

                            <PlayerList />

                            <CardShop />
                        </div>
                    </div>
                </Media>
            </>
        );
    }
}

const GameStage = DragDropContext(MultiBackend(HTML5toTouch))(GameStageUnconnected);

export {
    GameStage
};
