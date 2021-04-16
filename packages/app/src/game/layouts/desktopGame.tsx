import * as React from "react";

import { Footer } from "../../display";
import {
    BoardContainer, PlayerList, CardShop, Help,
    Profile, RoundIndicator, PhaseInfo,
    NowPlaying, QuitGameButton
} from "../module";

const DesktopGame: React.FunctionComponent = () => {
    return (
        <div className="game landscape">
            <div className="group">
                <RoundIndicator />

                <PhaseInfo />

                <NowPlaying />

                <PlayerList />
            </div>

            <BoardContainer />

            <div className="group right">
                <QuitGameButton />

                <CardShop showBalance />

                <Profile />

                <div className="help-container"><Help hideFooter /></div>

                <Footer />
            </div>
        </div>
    );
};

export { DesktopGame };
