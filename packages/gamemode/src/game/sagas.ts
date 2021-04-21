import { Logger } from "winston";
import { GameOptions } from "@creature-chess/models";
import { Player } from "../player";

export type GameSagaDependencies = {
    getMatchups: () => { homeId: string, awayId: string, awayIsClone: boolean }[];
    options: GameOptions;
    players: {
        getAll: () => Player[];
        getLiving: () => Player[];
        getById: (id: string) => Player | null;
    };
    logger: Logger;
};
