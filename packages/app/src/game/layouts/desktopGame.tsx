import * as React from "react";
import { BoardContainer } from "../components/board/boardContainer";
import { CardShop } from "../components/cardShop";
import { PlayerList } from "../../features/playerList/playerList";
import { Profile } from "../../display/profile/profile";
import { RoundIndicator } from "../../display/roundIndicator";
import { PhaseInfo } from "../../display/phaseInfo";
import { QuitGameButton } from "../../display/game/settings/quitGameButton";
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
