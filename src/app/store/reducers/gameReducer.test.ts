import { TestFixture, Test, Expect } from "alsatian";
import { phaseStartSeconds } from "../actions/gameActions";
import { game } from "./gameReducer";
import { ConnectionStatus, GamePhase } from "@common";

@TestFixture("gameReducer tests")
export class GameReducerTests {
  @Test()
  public shouldReturnInitialState() {
    const state = game(undefined, { type: undefined });

    Expect(state).toEqual({
      gameId: null,
      opponentId: null,
      loading: false,
      menuError: null,
      money: 0,
      phase: GamePhase.WAITING,
      phaseStartedAtSeconds: null,
      round: null,
      debug: false,
      mainAnnouncement: null,
      subAnnouncement: null,
      selectedPiece: null,
      connectionStatus: ConnectionStatus.NOT_CONNECTED,
      shopLocked: false,
      winnerName: null
    });
  }

  @Test()
  public shouldHandlePhaseStartSeconds() {
    const action = phaseStartSeconds(100);

    const state = game(undefined, action);
    Expect(state.phaseStartedAtSeconds).toEqual(100);
  }
}
