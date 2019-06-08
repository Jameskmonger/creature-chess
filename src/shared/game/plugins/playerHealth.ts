import { GamePlugin } from "./gamePlugin";
import { EventManager } from "../events/eventManager";

export const playerHealth: GamePlugin = (eventManager: EventManager) => {
    eventManager.onPlayerFinishMatch(event => {
        const damage = event.awayScore * 3;

        event.player.subtractHealth(damage);
    });
};
