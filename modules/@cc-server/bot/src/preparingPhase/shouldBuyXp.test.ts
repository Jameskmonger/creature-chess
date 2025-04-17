import { createInitialBoardState } from "@shoki/board";

import { PlayerState } from "@creature-chess/gamemode";
import { getXpToNextLevel } from "@creature-chess/gamemode/src/player/xp";
import { GamePhase } from "@creature-chess/models";
import { PlayerStatus } from "@creature-chess/models/game/playerList";
import { StreakType, PlayerStreak } from "@creature-chess/models/player";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import { shouldBuyXp } from "./shouldBuyXp";

const createInitialPlayerState = (): PlayerState => ({
	board: createInitialBoardState("board", {
		width: GamemodeSettingsPresets["default"].boardWidth,
		height: GamemodeSettingsPresets["default"].boardHalfHeight,
	}),
	bench: createInitialBoardState("bench", {
		width: GamemodeSettingsPresets["default"].benchSize,
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
		opponentIsClone: false,
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
			const result = shouldBuyXp(state, GamemodeSettingsPresets["default"]);

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
							xp: xpRequired - GamemodeSettingsPresets["default"].buyXpAmount,
						},
					};
				});

				test("should return false", () => {
					const result = shouldBuyXp(state, GamemodeSettingsPresets["default"]);

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
							xp: xpRequired - GamemodeSettingsPresets["default"].buyXpAmount,
						},
					};
				});

				test("should return true", () => {
					const result = shouldBuyXp(state, GamemodeSettingsPresets["default"]);

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
							xp:
								xpRequired - 2 * GamemodeSettingsPresets["default"].buyXpAmount,
						},
					};
				});

				test("should return false", () => {
					const result = shouldBuyXp(state, GamemodeSettingsPresets["default"]);

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
							xp: xpRequired - GamemodeSettingsPresets["default"].buyXpAmount,
						},
					};
				});

				test("should return true", () => {
					const result = shouldBuyXp(state, GamemodeSettingsPresets["default"]);

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
							xp:
								xpRequired - 2 * GamemodeSettingsPresets["default"].buyXpAmount,
						},
					};
				});

				test("should return true", () => {
					const result = shouldBuyXp(state, GamemodeSettingsPresets["default"]);

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
							xp:
								xpRequired - 3 * GamemodeSettingsPresets["default"].buyXpAmount,
						},
					};
				});

				test("should return true", () => {
					const result = shouldBuyXp(state, GamemodeSettingsPresets["default"]);

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
							xp:
								xpRequired - 4 * GamemodeSettingsPresets["default"].buyXpAmount,
						},
					};
				});

				test("should return false", () => {
					const result = shouldBuyXp(state, GamemodeSettingsPresets["default"]);

					expect(result).toBe(false);
				});
			});
		});
	});
});
