import { Builders, CreatureType } from "@creature-chess/models";
import { isStrategicCard, isStrategicPiece } from "./isStrategic";

describe("utils/creatureType/isStrategic", () => {
	const types = [
		CreatureType.Earth, CreatureType.Earth,
		CreatureType.Fire, CreatureType.Fire, CreatureType.Fire,
		CreatureType.Water,
	];

	const pieces = types.map(t =>
		Builders.buildPieceModel({
			definition: Builders.buildDefinition({
				type: t
			})
		})
	);

	describe("isStrategicCard", () => {
		describe("card for unowned type", () => {
			const card = Builders.buildCard({ type: CreatureType.Wood });

			test("should return true", () => {
				const result = isStrategicCard(card, pieces);

				expect(result).toBe(true);
			});
		});

		describe("card for type with many owned", () => {
			const card = Builders.buildCard({ type: CreatureType.Fire });

			test("should return false", () => {
				const result = isStrategicCard(card, pieces);

				expect(result).toBe(false);
			});
		});
	});

	describe("isStrategicPiece", () => {
		describe("piece for unowned type", () => {
			const piece = Builders.buildPieceModel({
				definition: Builders.buildDefinition({
					type: CreatureType.Wood
				})
			});

			test("should return true", () => {
				const result = isStrategicPiece(piece, pieces);

				expect(result).toBe(true);
			});
		});

		describe("piece for type with many owned", () => {
			const piece = Builders.buildPieceModel({
				definition: Builders.buildDefinition({
					type: CreatureType.Fire
				})
			});

			test("should return false", () => {
				const result = isStrategicPiece(piece, pieces);

				expect(result).toBe(false);
			});
		});

		describe("piece for type with one owned", () => {
			const piece = Builders.buildPieceModel({
				definition: Builders.buildDefinition({
					type: CreatureType.Water
				})
			});

			test("should return true", () => {
				const result = isStrategicPiece(piece, pieces);

				expect(result).toBe(true);
			});
		});
	});
});
