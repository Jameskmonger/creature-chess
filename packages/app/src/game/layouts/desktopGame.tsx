import * as React from "react";
import { BoardContainer } from "../features/board/boardContainer";
import { CardShop } from "../features/cardShop";
import { PlayerList } from "../features/playerList";
import { Profile } from "../features/profile";
import { RoundIndicator } from "../features/roundIndicator";
import { PhaseInfo } from "../features/phaseInfo";
import { QuitGameButton } from "../features/settings";
import { Footer } from "../../ui/display/footer";
import { Help } from "../features/help";

const DesktopGame: React.FunctionComponent = () => {
    return (
        <div className="game landscape">
            <div className="group">
                <RoundIndicator />

                <PhaseInfo />

                <PlayerList />
            </div>

            <BoardContainer />

            <div className="group right">
                <QuitGameButton />

                <CardShop showBalance />

                <p className="connection-warning">If you encounter connection issues, please refresh and press "Find Game" to reconnect</p>

                <Profile />

                <div className="help-container"><Help hideFooter /></div>

                <Footer />
            </div>
        </div>
    );
};

export { DesktopGame };
