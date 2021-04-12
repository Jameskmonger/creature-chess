import { GameOptions } from "@creature-chess/models";
import { Player } from "../player";
import { IOpponentProvider } from "./opponentProvider";

export type GameSagaDependencies = {
    getMatchups: () => { homeId: string, awayId: string, awayIsClone: boolean }[];
    options: GameOptions;
    players: {
        getAll: () => Player[];
        getLiving: () => Player[];
        getById: (id: string) => Player | null;
    }
};
