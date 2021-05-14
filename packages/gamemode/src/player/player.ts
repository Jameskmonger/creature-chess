import { Logger } from "winston";
import { SagaMiddleware } from "redux-saga";
import { PlayerProfile } from "@creature-chess/models";

import { createPlayerStore, PlayerState } from "./store";
import { Game } from "../game";

export class Player {
	/**
	 * Run a saga on the Player object.
	 *
	 * @template S The type of Saga to run.
	 *
	 * @param saga - The saga to run, of type {@link S}
	 * @param args - Optional arguments for the saga, of type {@link Parameters<S>}
	 *
	 * @return
	 */
	public readonly runSaga: SagaMiddleware["run"];

	/**
	 * Runs a selector on the {@link PlayerState} and returns the result.
	 *
	 * @param selector - The selector to execute.
	 *
	 * @returns The result of the selector.
	 */
	public readonly select: <T>(selector: (state: PlayerState) => T) => T;

	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly profile: PlayerProfile,
		public readonly game: Game,
		logger: Logger
	) {
		const { store, runSaga } = createPlayerStore(
			{
				logger
			},
			this.id,
			this.name
		);

		this.runSaga = runSaga;
		this.select = selector => selector(store.getState());
	}
}
