import * as React from "react";
import { Board } from "./board";
import { Bench } from "./bench";
import { NowPlaying } from "../nowPlaying";

const BoardContainer: React.FunctionComponent<{ showNowPlaying?: boolean }> = ({ showNowPlaying = false }) => {
    return (
        <div className="group board-container">
            { showNowPlaying && <NowPlaying /> }
            <Board />

            <Bench />
        </div>
    );
};

export { BoardContainer };
