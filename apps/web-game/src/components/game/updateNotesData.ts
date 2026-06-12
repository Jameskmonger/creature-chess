type ReleaseSection = {
	title: string;
	items: string[];
};

export type Release = {
	version: string;
	sections: ReleaseSection[];
};

export const updateNotes: Release[] = [
	{
		version: "0.8.1",
		sections: [
			{
				title: "Bugs",
				items: [
					"Fix Discord icon not showing up.",
				],
			},
		],
	},
	{
		version: "0.8.0",
		sections: [
			{
				title: "Features",
				items: [
					"New menu and lobby page.",
					"Use coin icon consistently across the game to represent gold.",
					"Drag pieces to move and swap them, with a preview under your cursor.",
					"You now get 60 seconds to prepare each round.",
					"Levelling up costs more XP, and battles hit a little softer.",
				],
			},
			{
				title: "Bugs",
				items: [
					"Fix projectile animations.",
					"Make 'Ready' button more responsive.",
					"Deselect pieces when selling them.",
					"Improve opponent selection logic.",
				],
			},
			{
				title: "Tech",
				items: [
					"Added a plugin system so the game can be modded.",
					"Big rewrite under the hood for faster, smoother battles.",
					"Improve mobile performance.",
				],
			},
		],
	},
];
