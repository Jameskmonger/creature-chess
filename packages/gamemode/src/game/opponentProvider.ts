import { shuffle } from "lodash";
import { PlayerStatus } from "@creature-chess/models";
import { PlayerEntity } from "../entities";
import { PlayerStateSelectors } from "../entities/player";

const randomFromArray = <T>(array: T[]) => {
	return array[Math.floor(Math.random() * array.length)];
};

export class OpponentProvider {
	private remainingRotations: number[] | null = null;
	private rotation: number = 0;

	private lastLivingPlayerCount: number = 0;
	private lastOddMatchupHomeId: string | null = null;
	private lastOddMatchupAwayId: string | null = null;

	private getLivingPlayers: () => PlayerEntity[];

	constructor(players: PlayerEntity[]) {
		this.getLivingPlayers = () => players.filter(p => p.select(PlayerStateSelectors.getPlayerStatus) !== PlayerStatus.QUIT && p.select(PlayerStateSelectors.isPlayerAlive));
	}

	public getMatchups = () => {
		const livingPlayers = this.getLivingPlayers();
		const livingPlayerCount = livingPlayers.length;

		if (livingPlayerCount !== this.lastLivingPlayerCount) {
			this.lastLivingPlayerCount = livingPlayerCount;
			this.remainingRotations = null;
		}

		if (this.remainingRotations === null || this.remainingRotations.length === 0) {
			this.generateRotations(livingPlayers);
		}

		const isEven = livingPlayers.length % 2 === 0;
		const output = isEven ? this.getMatchupsEven(livingPlayers) : this.getMatchupsOdd(livingPlayers);

		this.updateRotation();

		return output;
	}

	private getMatchupsEven(livingPlayers: PlayerEntity[]) {
		const matchups: ({ homeId: string, awayId: string, awayIsClone: boolean })[] = [];

		let remainingPlayerIds = livingPlayers.map(p => p.id);
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

	private getMatchupsOdd(livingPlayers: PlayerEntity[]) {
		const cloneMatchup = this.getOddCloneMatchup(livingPlayers);

		const otherPlayers = livingPlayers.filter(({ id }) => id !== cloneMatchup.homeId);

		return [
			cloneMatchup,
			...this.getMatchupsEven(otherPlayers)
		];
	}

	private getOddCloneMatchup(livingPlayers: PlayerEntity[]) {
		const potentialHomePlayers = livingPlayers.filter(({ id }) => id !== this.lastOddMatchupHomeId || this.lastOddMatchupHomeId === null);
		const home = randomFromArray(potentialHomePlayers);

		const potentialAwayPlayers = livingPlayers.filter(
			({ id }) => id !== home.id && (id !== this.lastOddMatchupAwayId || this.lastOddMatchupAwayId === null)
		);
		const away = randomFromArray(potentialAwayPlayers);

		this.lastOddMatchupHomeId = home.id;
		this.lastOddMatchupAwayId = away.id;

		return {
			homeId: home.id,
			awayId: away.id,
			awayIsClone: true
		};
	}

	private generateRotations(livingPlayers: PlayerEntity[]) {
		const rotations = [];

		// in head-to-head rotation,
		// a 3 player game will have rotations: [ 1, 2 ]
		for (let i = 1; i < livingPlayers.length; i++) {
			rotations.push(i);
		}

		this.remainingRotations = shuffle(rotations);

		this.updateRotation();
	}

	private updateRotation() {
		if (!this.remainingRotations) {
			return;
		}

		const chosen = randomFromArray(this.remainingRotations);

		this.remainingRotations = this.remainingRotations.filter(i => i !== chosen);

		this.rotation = chosen;
	}
}
