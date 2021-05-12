import { Player, PlayerType } from "@creature-chess/gamemode";
import { PlayerProfile } from "@creature-chess/models";
import { botLogicSaga } from "./saga";

export class BotPlayer extends Player {
    public readonly type = PlayerType.BOT;
    constructor(id: string, name: string, profile: PlayerProfile) {
        // todo fix typing
        super(id, name, profile);

        this.runSaga(botLogicSaga);
    }
}
