import { createInitialBoardState } from "@shoki/board";

import { PlayerState } from "@creature-chess/gamemode";
import {
	BUY_XP_AMOUNT,
	GamePhase,
	getXpToNextLevel,
	PlayerStatus,
	StreakType,
} from "@creature-chess/models";

import { shouldBuyXp } from "./shouldBuyXp";

const createInitialPlayerState = (): PlayerState => ({
	board: createInitialBoardState("board", { width: 7, height: 3 }),
	bench: createInitialBoardState("board", { width: 7, height: 1 }),
	cardShop: {
		cards: [],
		locked: false,
	},
	playerInfo: {
		health: 100,
		money: 3,
		level: 1,
		xp: 0,
		status: PlayerStatus.CONNECTED,
		ready: false,
		streak: {
			amount: 2,
			type: StreakType.WIN,
		},
		battle: null,
		matchRewards: null,
		opponentId: null,
	},
	roundInfo: {
		phase: GamePhase.PREPARING,
		round: 3,
		phaseStartedAtSeconds: 1000000,
	},
	spectating: { id: null },
});

describe("shouldBuyXp", () => {
	let state: PlayerState;

	beforeEach(() => {
		state = createInitialPlayerState();
	});

	describe("when level 10", () => {
		beforeEach(() => {
			state = {
				...state,
				playerInfo: {
					...state.playerInfo,
					money: 9999,
					level: 10,
				},
			};
		});

		test("should return false", () => {
			const result = shouldBuyXp(state);

			expect(result).toBe(false);
		});
	});

	describe("when below level 10", () => {
		beforeEach(() => {
			state = {
				...state,
				playerInfo: {
					...state.playerInfo,
					level: 9,
				},
			};
		});

		describe("when money is 14", () => {
			beforeEach(() => {
				state = {
					...state,
					playerInfo: {
						...state.playerInfo,
						money: 14,
					},
				};
			});

			describe("when bot needs 1 purchase to level up [can not afford]", () => {
				beforeEach(() => {
					const xpRequired = getXpToNextLevel(state.playerInfo.level)!;

					state = {
						...state,
						playerInfo: {
							...state.playerInfo,
							xp: xpRequired - BUY_XP_AMOUNT,
						},
					};
				});

				test("should return false", () => {
					const result = shouldBuyXp(state);

					expect(result).toBe(false);
				});
			});
		});

		describe("when money is 15", () => {
			beforeEach(() => {
				state = {
					...state,
					playerInfo: {
						...state.playerInfo,
						money: 15,
					},
				};
			});

			describe("when bot needs 1 purchase to level up [can afford]", () => {
				beforeEach(() => {
					const xpRequired = getXpToNextLevel(state.playerInfo.level)!;

					state = {
						...state,
						playerInfo: {
							...state.playerInfo,
							xp: xpRequired - BUY_XP_AMOUNT,
						},
					};
				});

				test("should return true", () => {
					const result = shouldBuyXp(state);

					expect(result).toBe(true);
				});
			});

			describe("when bot needs 2 purchase to level up [can not afford]", () => {
				beforeEach(() => {
					const xpRequired = getXpToNextLevel(state.playerInfo.level)!;

					state = {
						...state,
						playerInfo: {
							...state.playerInfo,
							xp: xpRequired - 2 * BUY_XP_AMOUNT,
						},
					};
				});

				test("should return false", () => {
					const result = shouldBuyXp(state);

					expect(result).toBe(false);
				});
			});
		});

		describe("when money is 25", () => {
			beforeEach(() => {
				state = {
					...state,
					playerInfo: {
						...state.playerInfo,
						money: 25,
					},
				};
			});

			describe("when bot needs 1 purchase to level up [can afford]", () => {
				beforeEach(() => {
					const xpRequired = getXpToNextLevel(state.playerInfo.level)!;

					state = {
						...state,
						playerInfo: {
							...state.playerInfo,
							xp: xpRequired - BUY_XP_AMOUNT,
						},
					};
				});

				test("should return true", () => {
					const result = shouldBuyXp(state);

					expect(result).toBe(true);
				});
			});

			describe("when bot needs 2 purchases to level up [can afford]", () => {
				beforeEach(() => {
					const xpRequired = getXpToNextLevel(state.playerInfo.level)!;

					state = {
						...state,
						playerInfo: {
							...state.playerInfo,
							xp: xpRequired - 2 * BUY_XP_AMOUNT,
						},
					};
				});

				test("should return true", () => {
					const result = shouldBuyXp(state);

					expect(result).toBe(true);
				});
			});

			describe("when bot needs 3 purchases to level up [can afford]", () => {
				beforeEach(() => {
					const xpRequired = getXpToNextLevel(state.playerInfo.level)!;

					state = {
						...state,
						playerInfo: {
							...state.playerInfo,
							xp: xpRequired - 3 * BUY_XP_AMOUNT,
						},
					};
				});

				test("should return true", () => {
					const result = shouldBuyXp(state);

					expect(result).toBe(true);
				});
			});

			describe("when bot needs 4 purchases to level up [can not afford]", () => {
				beforeEach(() => {
					const xpRequired = getXpToNextLevel(state.playerInfo.level)!;

					state = {
						...state,
						playerInfo: {
							...state.playerInfo,
							xp: xpRequired - 4 * BUY_XP_AMOUNT,
						},
					};
				});

				test("should return false", () => {
					const result = shouldBuyXp(state);

					expect(result).toBe(false);
				});
			});
		});
	});
});
