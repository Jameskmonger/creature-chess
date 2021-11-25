import { Builders, CreatureType } from "@creature-chess/models";
import { getOwnedPieceTypes } from "./getOwnedTypes";

describe("utils/creatureType/getOwnedTypes", () => {
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

	test("should return correct counts", () => {
		const result = getOwnedPieceTypes(pieces);

		expect(result[CreatureType.Earth]).toEqual(2);
		expect(result[CreatureType.Fire]).toEqual(3);
		expect(result[CreatureType.Water]).toEqual(1);
		expect(result[CreatureType.Wood]).toEqual(0);
		expect(result[CreatureType.Metal]).toEqual(0);
	});
});
