import { Player, PlayerType} from "@creature-chess/gamemode";
import { botLogicSaga } from "./saga";

export class BotPlayer extends Player {
    public readonly type = PlayerType.BOT;

    constructor(id: string, name: string, picture: number) {
        // todo fix typing
        super(id, name, picture);

        this.sagaMiddleware.run(botLogicSaga);
    }
}
