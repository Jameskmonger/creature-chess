import { TestFixture, Test, Expect } from "alsatian";
import { reducer } from "./reducer";
import { ConnectionStatus } from "@creature-chess/shared/networking";
import { GamePhase } from "@creature-chess/models";

@TestFixture("gameReducer tests")
export class GameReducerTests {
  @Test()
  public shouldReturnInitialState() {
    const state = reducer(undefined, { type: undefined });

    Expect(state).toEqual({
      localPlayerId: null,
      ready: false,
      opponentId: null,
      loading: false,
      phase: GamePhase.WAITING,
      round: null,
      debug: false,
      connectionStatus: ConnectionStatus.NOT_CONNECTED
    });
  }
}
