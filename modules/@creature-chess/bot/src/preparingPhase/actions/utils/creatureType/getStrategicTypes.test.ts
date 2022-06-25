import { Builders, CreatureType } from "@creature-chess/models";

import { getStrategicTypes } from "./getStrategicTypes";

describe("utils/creatureType/getStrategicTypes", () => {
	const types = [
		CreatureType.Earth,
		CreatureType.Earth,
		CreatureType.Fire,
		CreatureType.Fire,
		CreatureType.Fire,
		CreatureType.Water,
	];

	const pieces = types.map((t) =>
		Builders.buildPieceModel({
			definition: Builders.buildDefinition({
				type: t,
			}),
		})
	);

	test("result should contain unowned types", () => {
		const result = getStrategicTypes(pieces);

		expect(result).toContain(CreatureType.Wood);
		expect(result).toContain(CreatureType.Metal);
	});

	test("result should contain types with less than average # of pieces", () => {
		const result = getStrategicTypes(pieces);

		expect(result).toContain(CreatureType.Water);
	});

	test("result should not contain types with lots of pieces", () => {
		const result = getStrategicTypes(pieces);

		expect(result).not.toContain(CreatureType.Earth);
		expect(result).not.toContain(CreatureType.Fire);
	});
});
