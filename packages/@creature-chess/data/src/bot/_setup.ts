// tslint:disable: no-console
import { Client as FaunaDBClient, query as q } from "faunadb";
import { COLLECTION_NAMES, INDEX_NAMES } from "../constants";
import { BotData, BotPersonalityValue, DatabaseBot } from "./databaseBot";

const INSTANCE_ALREADY_EXISTS = "instance already exists";

const BOT_NAMES = [
	"Aggie",
	// "Bertie",
	"Conan",
	// "Dawn",
	// "Eddy",
	"Fox",
	"Ghost",
	"Hazuki",
	// "Isaac",
	"C.J.",
	"Knuckle",
	// "Lily",
	// "Madison",
	"Navi",
	// "Oscar",
	"Price",
	// "Quiet",
	"Rune",
	"Smoke",
	// "Tony",
	"U.B.",
	// "Venom",
	// "Warp",
	// "Xenon",
	"Yew",
	// "Zero"
];

const randomPersonalityValue = () => (Math.floor(Math.random() * 10 + 1) * 20) as BotPersonalityValue;

export const setupBotDatabase = async (client: FaunaDBClient) => {
	let shouldCreateBots = false;

	try {
		await client.query(q.CreateCollection({
			name: COLLECTION_NAMES.BOTS
		}));

		console.log(` - Created collection '${COLLECTION_NAMES.BOTS}'`);

		// if we just created the collection, create bots
		shouldCreateBots = true;
	} catch (e) {
		if (e.message === INSTANCE_ALREADY_EXISTS) {
			console.log(` - Collection '${COLLECTION_NAMES.BOTS}' already exists`);
		} else {
			throw e;
		}
	}

	try {
		await client.query(q.CreateIndex({
			name: INDEX_NAMES.BOTS_BY_LOWEST_GAMES_PLAYED,
			serialized: true,
			source: {
				collection: q.Collection(COLLECTION_NAMES.BOTS),
				fields: {
					gamesPlayed: q.Query(
						q.Lambda(
							"document",
							q.Select(["data", "stats", "gamesPlayed"], q.Var("document"))
						)
					)
				}
			},
			values: [
				{
					binding: "gamesPlayed",
					reverse: false
				},
				{
					field: ["ref", "id"]
				},
				{
					field: ["data", "nickname"]
				}
			]
		}));

		console.log(` - Created index '${INDEX_NAMES.BOTS_BY_LOWEST_GAMES_PLAYED}'`);
	} catch (e) {
		if (e.message === INSTANCE_ALREADY_EXISTS) {
			console.log(` - Index '${INDEX_NAMES.BOTS_BY_LOWEST_GAMES_PLAYED}' already exists`);
		} else {
			throw e;
		}
	}

	if (shouldCreateBots) {
		for (const name of BOT_NAMES) {
			const data: BotData = {
				nickname: name,
				stats: {
					gamesPlayed: 0,
					wins: 0
				},
				personality: {
					ambition: randomPersonalityValue(),
					composure: randomPersonalityValue(),
					vision: randomPersonalityValue()
				}
			};

			await client.query<DatabaseBot>(
				q.Create(
					q.Collection(COLLECTION_NAMES.BOTS),
					{ data }
				)
			);

			console.log(` - Created bot '${name}'`);
		}
	}
};
