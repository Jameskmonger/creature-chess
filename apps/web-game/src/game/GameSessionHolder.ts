import { Holder } from "~/utils/Holder";

import { GameSession } from "./GameSession";

export class GameSessionHolder extends Holder<GameSession> {
	public constructor() {
		super("GameSession");
	}
}
