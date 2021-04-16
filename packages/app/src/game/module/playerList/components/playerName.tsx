import * as React from "react";
import { useSelector } from "react-redux";
import { PlayerListPlayer } from "@creature-chess/models";
import { AppState } from "../../../../store";
import { getPlayerById } from "./selectors";

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
