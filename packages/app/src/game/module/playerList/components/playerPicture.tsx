import * as React from "react";
import { useSelector } from "react-redux";
import { PlayerListPlayer } from "@creature-chess/models";
import { AppState } from "../../../../store";
import { getPlayerById } from "./selectors";

interface Props {
    playerId: string;
}

const PlayerPicture: React.FunctionComponent<Props> = ({ playerId }) => {
    const player = useSelector<AppState, PlayerListPlayer>(getPlayerById(playerId));

    if (!player || !player.profile.picture) {
        return null;
    }

    return <img src={`https://creaturechess.jamesmonger.com/images/front/${player.profile.picture}.png`} />;
};

export { PlayerPicture };
