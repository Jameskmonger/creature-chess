import { isPlayerShopLocked } from "./playerSelectors";

describe("playerSelectors", () => {
    describe("isPlayerShopLocked", () => {
        describe("when shopLocked is false", () => {
            // todo use a builder here
            const state: any = {
                playerInfo: {
                    shopLocked: false
                }
            };

            test("should return false", () => {
                expect(isPlayerShopLocked(state)).toEqual(false);
            });
        });

        describe("when shopLocked is true", () => {
            // todo use a builder here
            const state: any = {
                playerInfo: {
                    shopLocked: true
                }
            };

            test("should return true", () => {
                expect(isPlayerShopLocked(state)).toEqual(true);
            });
        });
    });
});
