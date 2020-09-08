import { EventManager } from "../events/eventManager";

export type GamePlugin = (eventManager: EventManager) => void;
