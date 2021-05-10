import { Player } from "@creature-chess/gamemode";
import { PlayerProfile } from "@creature-chess/models";
import { botLogicSaga } from "./saga";

export class BotPlayer extends Player {
    public readonly isBot = true;

    constructor(id: string, name: string, profile: PlayerProfile) {
        // todo fix typing
        super(id, name, profile);

        this.sagaMiddleware.run(botLogicSaga);
    }
}
