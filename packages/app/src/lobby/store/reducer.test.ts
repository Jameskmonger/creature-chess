import { TestFixture, Test, Expect } from "alsatian";
import { lobby } from "./reducer";
import { joinLobbyAction } from "./actions";

@TestFixture("lobbyReducer tests")
export class LobbyReducerTests {
  @Test()
  public shouldReturnInitialState() {
    const state = lobby(undefined, { type: undefined } as any);

    Expect(state).toEqual({
      lobbyId: null,
      localPlayerId: null,
      players: [],
      startingAtMs: null,
      requestNicknameMessage: null
    });
  }

  @Test()
  public shouldHandleJoinLobbyAction() {
    const action = joinLobbyAction(
      "123",
      "456",
      [ { id: "789", name: "Bob", isBot: false } ],
      1234
    );

    const state = lobby(undefined, action);
    Expect(state.localPlayerId).toEqual("123");
    Expect(state.lobbyId).toEqual("456");
    Expect(state.players).toEqual([ { id: "789", name: "Bob", isBot: false } ]);
    Expect(state.startingAtMs).toEqual(1234);
  }
}
