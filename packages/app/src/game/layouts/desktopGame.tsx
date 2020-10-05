import * as React from "react";
import { BoardContainer } from "../components/board/boardContainer";
import { CardShop } from "../components/cardShop";
import { PlayerList } from "../components/playerList";
import { Profile } from "../components/profile";
import { RoundIndicator } from "../components/roundIndicator";
import { PhaseInfo } from "../components/phaseInfo";
import { QuitGameButton } from "../components/settings";
import { Footer } from "../../display/footer";

const DesktopGame: React.FunctionComponent = () => {
    return (
        <div className="game landscape">
            <div className="group">
                <RoundIndicator />

                <PhaseInfo />

                <PlayerList />
            </div>

            <BoardContainer />

            <div className="group">
                <QuitGameButton />

                <CardShop showBalance />

                <Profile />

                <Footer />
            </div>
        </div>
    );
};

export { DesktopGame };
