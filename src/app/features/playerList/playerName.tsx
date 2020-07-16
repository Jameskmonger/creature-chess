import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@app/store";
import { getPlayerById } from "@app/store/playerSelectors";
import { PlayerListPlayer } from "@common/models";

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
