import * as React from "react";
import { useSelector } from "react-redux";
import { GamePhase, PieceModel } from "@creature-chess/models";
import { getPiece } from "@creature-chess/gamemode";
import { AppState } from "../../../../../store";
import { ProgressBar } from "../../../../../ui";
import { getUserId } from "../../../../../auth";

interface HealthbarProps {
    pieceId: string;
    pieceIsOnBench?: boolean;
    vertical?: boolean;
}

const Healthbar: React.FunctionComponent<HealthbarProps> = ({ pieceId, vertical = false, pieceIsOnBench = false }) => {
    const showHealthbar = useSelector<AppState, boolean>(state => (
        state.game.roundInfo.phase === GamePhase.READY
        || state.game.roundInfo.phase === GamePhase.PLAYING
    ));

    const piece = useSelector<AppState, (PieceModel | null)>(state => getPiece(state.game, pieceId));

    const localPlayerId = useSelector<AppState, string>(getUserId);

    if (!showHealthbar || !piece || pieceIsOnBench) {
        return null;
    }

    const { ownerId, currentHealth, maxHealth } = piece;
    const friendly = (localPlayerId === ownerId);

    return (
            <ProgressBar
                className={`healthbar ${friendly ? "friendly" : "enemy"} ${vertical ? "vertical" : ""}`}
                current={currentHealth}
                max={maxHealth}
                vertical={vertical}
            />
    );
};

export { Healthbar };
