import { shuffle } from "lodash";
import { Player } from "./player/player";
import { randomFromArray } from "@common/utils";
import { log } from "@common/log";

export class OpponentProvider {
    private players: Player[];
    private remainingRotations: number[];
    private rotation: number;

    public updateRotation() {
        const chosen = randomFromArray(this.remainingRotations);

        this.remainingRotations = this.remainingRotations.filter(i => i !== chosen);

        this.rotation = chosen;
    }

    public setPlayers(players: Player[]) {
        this.players = players;

        this.generateRotations();
    }

    public getOpponent(localPlayerId: string) {
        const index = this.players.findIndex(p => p.id === localPlayerId);

        const player = this.players[(index + this.rotation) % this.players.length];

        if (player) {
            return player;
        }

        const otherPlayers = this.players.filter(p => p.id !== localPlayerId);

        return randomFromArray(otherPlayers);
    }

    private generateRotations() {
        const rotations = [];

        // a 3 player game will have rotations: [ 1, 2 ]
        for (let i = 1; i < this.players.length; i++) {
            rotations.push(i);
        }

        this.remainingRotations = shuffle(rotations);

        this.updateRotation();
    }
}
