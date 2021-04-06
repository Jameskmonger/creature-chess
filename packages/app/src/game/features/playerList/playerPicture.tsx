import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import { getPlayerById } from "../../../store/playerSelectors";
import { PlayerListPlayer } from "@creature-chess/models";

interface Props {
    playerId: string;
}


const PlayerPicture: React.FunctionComponent<Props> = ({ playerId }) => {
    const player = useSelector<AppState, PlayerListPlayer>(getPlayerById(playerId));

    if (!player || !player.picture) {
        return null;
    }

    return <img src={`https://creaturechess.jamesmonger.com/images/front/${player.picture}.png`} />;
};

export { PlayerPicture };
