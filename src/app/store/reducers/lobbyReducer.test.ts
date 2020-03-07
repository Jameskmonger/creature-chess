import { TestFixture, Test, Expect } from "alsatian";
import { lobby } from "./lobbyReducer";
import { updateLobbyStartMs } from "../actions/lobbyActions";

@TestFixture("lobbyReducer tests")
export class LobbyReducerTests {
  @Test()
  public shouldReturnInitialState() {
    const state = lobby(undefined, { type: undefined });

    Expect(state).toEqual({
      lobbyId: null,
      localPlayerId: null,
      players: [],
      startingAtMs: null,
      isHost: false
  });
  }

  @Test()
  public shouldHandleLobbyStartMs() {
    const action = updateLobbyStartMs(100);

    const state = lobby(undefined, action);
    Expect(state.startingAtMs).toEqual(100);
  }
}
