import { TestFixture, Test, Expect } from "alsatian";
import { lobby } from "./lobbyReducer";
import { joinLobbyAction } from "../actions/lobbyActions";

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
  public shouldHandleJoinLobbyAction() {
    const action = joinLobbyAction(
      "123",
      "456",
      [ { id: "789", name: "Bob", isBot: false, isHost: false } ],
      1234,
      true
    );

    const state = lobby(undefined, action);
    Expect(state.localPlayerId).toEqual("123");
    Expect(state.lobbyId).toEqual("456");
    Expect(state.players).toEqual([ { id: "789", name: "Bob", isBot: false, isHost: false } ]);
    Expect(state.startingAtMs).toEqual(1234);
    Expect(state.isHost).toEqual(true);
  }
}
