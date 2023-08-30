import { createInitialBoardState } from "@shoki/board";

import { PlayerState } from "@creature-chess/gamemode";
import { getXpToNextLevel } from "@creature-chess/gamemode/src/player/xp";
import { GamePhase } from "@creature-chess/models";
import { StreakType, PlayerStreak } from "@creature-chess/models/player";
import { PlayerStatus } from "@creature-chess/models/game/playerList";
import { DEFAULT_GAME_OPTIONS } from "@creature-chess/models/config";

import { shouldBuyXp } from "./shouldBuyXp";

const createInitialPlayerState = (): PlayerState => ({
	board: createInitialBoardState("board", { width: DEFAULT_GAME_OPTIONS.boardSize.width, height: DEFAULT_GAME_OPTIONS.boardSize.height / 2 }),
	bench: createInitialBoardState("bench", {
		width: DEFAULT_GAME_OPTIONS.benchSize,
		height: 1,
	}),
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
							xp: xpRequired - DEFAULT_GAME_OPTIONS.game.buyXpAmount,
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
							xp: xpRequired - DEFAULT_GAME_OPTIONS.game.buyXpAmount,
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
							xp: xpRequired - 2 * DEFAULT_GAME_OPTIONS.game.buyXpAmount,
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
							xp: xpRequired - DEFAULT_GAME_OPTIONS.game.buyXpAmount,
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
							xp: xpRequired - 2 * DEFAULT_GAME_OPTIONS.game.buyXpAmount,
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
							xp: xpRequired - 3 * DEFAULT_GAME_OPTIONS.game.buyXpAmount,
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
							xp: xpRequired - 4 * DEFAULT_GAME_OPTIONS.game.buyXpAmount,
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
