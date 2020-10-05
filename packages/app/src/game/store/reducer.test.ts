import { TestFixture, Test, Expect } from "alsatian";
import { phaseStartSeconds } from "./actions";
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
      phaseStartedAtSeconds: null,
      round: null,
      debug: false,
      connectionStatus: ConnectionStatus.NOT_CONNECTED
    });
  }

  @Test()
  public shouldHandlePhaseStartSeconds() {
    const action = phaseStartSeconds(100);

    const state = reducer(undefined, action);
    Expect(state.phaseStartedAtSeconds).toEqual(100);
  }
}
