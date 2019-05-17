import { Player } from "./player";
import { randomFromArray } from "../random-from-array";

export class OpponentProvider {
    private players: Player[] = [];

    public setPlayers(players: Player[]) {
        this.players = players;
    }

    public getOpponent(localPlayerId: string) {
        const others = this.players.filter(other => other.isAlive() && other.id !== localPlayerId);
        return randomFromArray(others);
    }
}
