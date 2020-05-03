import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@app/store";
import { GamePhase, Piece, Constants } from "@common/models";
import { ProgressBar } from "../../progressBar";
import { getPiece } from "@common/player/pieceSelectors";

interface HealthbarProps {
    pieceId: string;
}

const Healthbar: React.FunctionComponent<HealthbarProps> = ({ pieceId }) => {
    const showHealthbar = useSelector<AppState, boolean>(state => (
        state.game.phase === GamePhase.READY
        || state.game.phase === GamePhase.PLAYING
    ));

    const piece = useSelector<AppState, (Piece | null)>(state => getPiece(state, pieceId));

    const localPlayerId = useSelector<AppState, string>(state => state.localPlayer.id);

    const pieceIsOnBench = piece.position.y === null;

    if (!showHealthbar || !piece || pieceIsOnBench) {
        return null;
    }

    const { ownerId, currentHealth, maxHealth, coolDown } = piece;
    const friendly = (localPlayerId === ownerId);

    return (
        <div className="info">
            <ProgressBar
                className={`healthbar ${friendly ? "friendly" : "enemy"}`}
                current={currentHealth}
                max={maxHealth}
            />
            <ProgressBar
                className="cooldownbar"
                current={coolDown}
                max={Constants.INITIAL_COOLDOWN}
            />
        </div>
    );
};

export { Healthbar };
