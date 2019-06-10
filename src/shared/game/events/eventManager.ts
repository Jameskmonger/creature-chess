import { Player } from "../player/player";
import { EventEmitter } from "events";

type GameEventHandler = (players: Player[]) => void;

type PlayerFinishMatchEvent = {
    player: Player;
    opponentName: string;
    homeScore: number;
    awayScore: number;
};
type PlayerFinishMatchEventHandler = (event: PlayerFinishMatchEvent) => void;

interface EventManagerTriggers {
    enterPreparingPhase: (players: Player[]) => void;
    finishRound: (players: Player[]) => void;
    playerFinishMatch: (event: PlayerFinishMatchEvent) => void;
}

enum Events {
    ENTER_PREPARING_PHASE = "ENTER_PREPARING_PHASE",
    FINISH_ROUND = "FINISH_ROUND",
    PLAYER_FINISH_MATCH = "PLAYER_FINISH_MATCH"
}

export class EventManager {
    private events = new EventEmitter();
    private triggers: EventManagerTriggers = {
        enterPreparingPhase: (players: Player[]) => {
            this.events.emit(Events.ENTER_PREPARING_PHASE, players);
        },
        finishRound: (players: Player[]) => {
            this.events.emit(Events.FINISH_ROUND, players);
        },
        playerFinishMatch: (event: PlayerFinishMatchEvent) => {
            this.events.emit(Events.PLAYER_FINISH_MATCH, event);
        }
    };

    public getTriggers() {
        return this.triggers;
    }

    public onEnterPreparingPhase(fn: GameEventHandler) {
        this.events.on(Events.ENTER_PREPARING_PHASE, fn);
    }

    public onFinishRound(fn: GameEventHandler) {
        this.events.on(Events.FINISH_ROUND, fn);
    }

    public onPlayerFinishMatch(fn: PlayerFinishMatchEventHandler) {
        this.events.on(Events.PLAYER_FINISH_MATCH, fn);
    }
}
