import * as React from "react";
import { useSelector } from "react-redux";
import { PlayerListPlayer, TITLES } from "@creature-chess/models";
import { AppState } from "../../../../store";
import { getPlayerById } from "./selectors";

interface Props {
    playerId: string;
}

const PlayerTitle: React.FunctionComponent<Props> = ({ playerId }) => {
    const player = useSelector<AppState, PlayerListPlayer>(getPlayerById(playerId));

    if (!player || !player.profile?.title) {
        return null;
    }

    return <span className={`player-profile-title ${TITLES[player.profile.title].className}`}>{TITLES[player.profile.title].text}</span>;
};

export { PlayerTitle };
