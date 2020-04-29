// tslint:disable:jsx-ban-props
import * as React from "react";
import { DndProvider } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";

import { CardShop } from "../../features/cardShop/cardShop";
import { PlayerList } from "../../features/playerList/playerList";

import Media from "react-media";
import { PhaseInfo } from "../../display/phaseInfo";
import { Profile } from "../../display/profile/profile";
import { Feed } from "../../features/feed/feed";
import { GameId } from "../../display/gameId";
import { RoundIndicator } from "../../display/roundIndicator";
import { BoardContainer } from "../board/boardContainer";

const GameStage: React.FunctionComponent = () => {
    return (
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <Media query="(orientation: landscape) and (min-width: 1200px)">
                <div className="game landscape">
                    <div className="group">
                        <RoundIndicator />

                        <PhaseInfo />

                        <PlayerList />

                        <GameId />

                        <Feed />
                    </div>

                    <BoardContainer />

                    <div className="group">
                        <CardShop />

                        <Profile />

                        <div className="github-link">
                            <a href="https://reddit.com/r/creaturechess/">/r/CreatureChess</a>
                            {" - "}
                            <a href="https://github.com/Jameskmonger/creature-chess">Source and Licenses on GitHub</a>
                        </div>
                    </div>
                </div>
            </Media>

            <Media query="(orientation: landscape) and (max-width: 1199px) and (min-width: 600px)">
                <div className="game landscape">
                    <BoardContainer />

                    <div className="group">
                        <RoundIndicator />

                        <PhaseInfo />

                        <CardShop />

                        <Profile />

                        <PlayerList />

                        <GameId />

                        <div className="github-link">
                            <a href="https://reddit.com/r/creaturechess/">/r/CreatureChess</a>
                            {" - "}
                            <a href="https://github.com/Jameskmonger/creature-chess">Source and Licenses on GitHub</a>
                        </div>

                        <Feed />
                    </div>
                </div>
            </Media>

            <Media query="(orientation: portrait), (max-width: 599px)">
                <div className="game portrait">
                    <BoardContainer />

                    <div className="group">
                        <RoundIndicator />

                        <PhaseInfo />

                        <CardShop />

                        <Profile />

                        <PlayerList />

                        <GameId />

                        <div className="github-link">
                            <a href="https://reddit.com/r/creaturechess/">/r/CreatureChess</a>
                            {" - "}
                            <a href="https://github.com/Jameskmonger/creature-chess">Source and Licenses on GitHub</a>
                        </div>

                        <Feed />
                    </div>
                </div>
            </Media>
        </DndProvider>
    );
}

export {
    GameStage
};
