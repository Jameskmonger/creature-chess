import { BUY_XP_AMOUNT, getXpToNextLevel } from "@creature-chess/models";
import { shouldBuyXp } from "./shouldBuyXp";

describe("shouldBuyXp", () => {
	describe("when level 10", () => {
		const level = 10;

		test("should return false", () => {
			const result = shouldBuyXp(9999, level, 0);

			expect(result).toBe(false);
		});
	});

	describe("when below level 10", () => {
		const level = 9;

		describe("when money is 13", () => {
			const money = 14;

			describe("when bot needs 1 purchase to level up [can not afford]", () => {
				const xpRequired = getXpToNextLevel(level);
				const xp = xpRequired - BUY_XP_AMOUNT;

				test("should return false", () => {
					const result = shouldBuyXp(money, level, xp);

					expect(result).toBe(false);
				});
			});
		});

		describe("when money is 15", () => {
			const money = 15;

			describe("when bot needs 1 purchase to level up [can afford]", () => {
				const xpRequired = getXpToNextLevel(level);
				const xp = xpRequired - BUY_XP_AMOUNT;

				test("should return true", () => {
					const result = shouldBuyXp(money, level, xp);

					expect(result).toBe(true);
				});
			});

			describe("when bot needs 2 purchase to level up [can not afford]", () => {
				const xpRequired = getXpToNextLevel(level);
				const xp = xpRequired - (2 * BUY_XP_AMOUNT);

				test("should return false", () => {
					const result = shouldBuyXp(money, level, xp);

					expect(result).toBe(false);
				});
			});
		});

		describe("when money is 25", () => {
			const money = 25;

			describe("when bot needs 1 purchase to level up [can afford]", () => {
				const xpRequired = getXpToNextLevel(level);
				const xp = xpRequired - BUY_XP_AMOUNT;

				test("should return true", () => {
					const result = shouldBuyXp(money, level, xp);

					expect(result).toBe(true);
				});
			});

			describe("when bot needs 2 purchases to level up [can afford]", () => {
				const xpRequired = getXpToNextLevel(level);
				const xp = xpRequired - (2 * BUY_XP_AMOUNT);

				test("should return true", () => {
					const result = shouldBuyXp(money, level, xp);

					expect(result).toBe(true);
				});
			});

			describe("when bot needs 3 purchases to level up [can afford]", () => {
				const xpRequired = getXpToNextLevel(level);
				const xp = xpRequired - (3 * BUY_XP_AMOUNT);

				test("should return true", () => {
					const result = shouldBuyXp(money, level, xp);

					expect(result).toBe(true);
				});
			});

			describe("when bot needs 4 purchases to level up [can not afford]", () => {
				const xpRequired = getXpToNextLevel(level);
				const xp = xpRequired - (4 * BUY_XP_AMOUNT);

				test("should return false", () => {
					const result = shouldBuyXp(money, level, xp);

					expect(result).toBe(false);
				});
			});
		});
	});
});
