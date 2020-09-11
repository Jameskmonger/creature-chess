import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { getPlayerById } from "../../store/playerSelectors";
import { PlayerListPlayer } from "@creature-chess/models";

interface Props {
    playerId: string;
}

const PlayerName: React.FunctionComponent<Props> = ({ playerId }) => {
    const player = useSelector<AppState, PlayerListPlayer>(getPlayerById(playerId));

    if (!player) {
        return null;

    }
    return <>{player.name}</>;
};

export { PlayerName };
