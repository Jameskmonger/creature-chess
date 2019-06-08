import { GamePlugin } from "./gamePlugin";
import { EventManager } from "../events/eventManager";

export const resetPlayer: GamePlugin = (eventManager: EventManager) => {
    eventManager.onEnterPreparingPhase(players => {
        players.forEach(p => p.reset());
    });
};
