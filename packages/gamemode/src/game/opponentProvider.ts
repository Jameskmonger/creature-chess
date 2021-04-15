import shuffle = require("lodash.shuffle");
import { Player } from "../player";

export interface IOpponentProvider {
    setPlayers(players: Player[]): void;
    getMatchups(): ({ homeId: string, awayId: string, awayIsClone: boolean })[];
}

const randomFromArray = <T>(array: T[]) => {
    return array[Math.floor(Math.random() * array.length)];
};

export class HeadToHeadOpponentProvider implements IOpponentProvider {
    private playerIds: string[];
    private remainingRotations: number[] = null;
    private rotation: number;

    private lastOddMatchupHomeId: string = null;
    private lastOddMatchupAwayId: string = null;

    public setPlayers(players: Player[]) {
        this.playerIds = players.map(p => p.id);
        this.remainingRotations = null;
    }

    public getMatchups() {
        if (this.remainingRotations === null || this.remainingRotations.length === 0) {
            this.generateRotations();
        }

        const isEven = this.playerIds.length % 2 === 0;
        const output = isEven ? this.getMatchupsEven(this.playerIds) : this.getMatchupsOdd(this.playerIds);

        this.updateRotation();

        return output;
    }

    private getMatchupsEven(playerIds: string[]) {
        const matchups: ({ homeId: string, awayId: string, awayIsClone: boolean })[] = [];

        let remainingPlayerIds = [...playerIds];
        while (remainingPlayerIds.length > 0) {
            // increment rotation by 1 if it would pick player 0
            const rotation =
                this.rotation % remainingPlayerIds.length === 0
                ? this.rotation + 1
                : this.rotation;

            const playerA = remainingPlayerIds[0];
            const playerB = remainingPlayerIds[rotation % remainingPlayerIds.length];

            remainingPlayerIds = remainingPlayerIds.filter(id => id !== playerA && id !== playerB);

            // dice roll
            const playerAIsHome = (Math.floor(Math.random() * Math.floor(2))) === 0;

            if (playerAIsHome) {
                matchups.push({ homeId: playerA, awayId: playerB, awayIsClone: false });
            } else {
                matchups.push({ homeId: playerB, awayId: playerA, awayIsClone: false });
            }
        }

        return matchups;
    }
    private getMatchupsOdd(playerIds: string[]) {
        const cloneMatchup = this.getOddCloneMatchup(playerIds);

        const otherPlayers = playerIds.filter(id => id !== cloneMatchup.homeId);

        return [
            cloneMatchup,
            ...this.getMatchupsEven(otherPlayers)
        ];
    }

    private getOddCloneMatchup(playerIds: string[]) {
        const potentialHomePlayers = playerIds.filter(id => id !== this.lastOddMatchupHomeId || this.lastOddMatchupHomeId === null);
        const homeId = randomFromArray(potentialHomePlayers);

        const potentialAwayPlayers = playerIds.filter(id => id !== homeId && (id !== this.lastOddMatchupAwayId || this.lastOddMatchupAwayId === null));
        const awayId = randomFromArray(potentialAwayPlayers);

        this.lastOddMatchupHomeId = homeId;
        this.lastOddMatchupAwayId = awayId;

        return {
            homeId,
            awayId,
            awayIsClone: true
        };
    }

    private generateRotations() {
        const rotations = [];

        // in head-to-head rotation,
        // a 3 player game will have rotations: [ 1, 2 ]
        for (let i = 1; i < this.playerIds.length; i++) {
            rotations.push(i);
        }

        this.remainingRotations = shuffle(rotations);

        this.updateRotation();
    }

    private updateRotation() {
        const chosen = randomFromArray(this.remainingRotations);

        this.remainingRotations = this.remainingRotations.filter(i => i !== chosen);

        this.rotation = chosen;
    }
}
