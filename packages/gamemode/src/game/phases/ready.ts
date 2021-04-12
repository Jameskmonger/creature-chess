import { put, delay } from "@redux-saga/core/effects";
import { GameOptions, GamePhase } from "@creature-chess/models";
import { RoundInfoCommands } from "../roundInfo";
import { Player } from "../../player";
import { IOpponentProvider } from "../opponentProvider";
import { Match } from "../match";

export const runReadyPhase = function*(opponentProvider: IOpponentProvider, players: Player[], phaseLengthMs: number, options: GameOptions) {
    const matchups = opponentProvider.getMatchups();

    matchups.forEach(({ homeId, awayId, awayIsClone }) => {
        const homePlayer = players.find(p => p.id === homeId);
        const awayPlayer = players.find(p => p.id === awayId);

        const match = new Match(homePlayer, awayPlayer, options);

        homePlayer.enterReadyPhase(match);

        if (!awayIsClone) {
            awayPlayer.enterReadyPhase(match);
        }
    });

    const phase = GamePhase.READY;
    const startedAt = Date.now() / 1000;
    yield put(RoundInfoCommands.setRoundInfoCommand({ phase, startedAt }));

    yield delay(phaseLengthMs);
};
