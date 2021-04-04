import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import { getPlayerById } from "../../../store/playerSelectors";
import { PlayerListPlayer } from "@creature-chess/models";

interface Props {
    playerId: string;
}


const PlayerTitle: React.FunctionComponent<Props> = ({ playerId }) => {
    const player = useSelector<AppState, PlayerListPlayer>(getPlayerById(playerId));

    if (!player || !player.title) {
        return null;
    }
    return <span className={`player-profile-title ${player.title.className}`}>{player.title.text}</span>;
};

export { PlayerTitle };
