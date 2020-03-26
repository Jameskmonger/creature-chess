import { TestFixture, Test, Expect } from "alsatian";
import { lockBoard, unlockBoard } from "../actions/boardActions";
import { locked } from "./lockedReducer";

@TestFixture()
export class LockedReducerTests {
  @Test()
  public initialStateShouldBeFalse() {
    const result = locked(undefined, { type: "foo" } as any);

    Expect(result).toEqual(false);
  }

  @Test()
  public lockBoardShouldReturnTrue() {
    const result = locked(false, lockBoard());

    Expect(result).toEqual(true);
  }

  @Test()
  public unlockBoardShouldReturnFalse() {
    const result = locked(true, unlockBoard());

    Expect(result).toEqual(false);
  }
}
