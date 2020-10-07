import { TestFixture, Test, Expect } from "alsatian";
import { lockBenchCommand, unlockBenchCommand } from "../commands";
import { locked } from "./lockedReducer";

@TestFixture()
export class LockedReducerTests {
  @Test()
  public initialStateShouldBeFalse() {
    const result = locked(undefined, { type: "foo" } as any);

    Expect(result).toEqual(false);
  }

  @Test()
  public lockBenchCommandShouldReturnTrue() {
    const result = locked(false, lockBenchCommand());

    Expect(result).toEqual(true);
  }

  @Test()
  public unlockBenchCommandShouldReturnFalse() {
    const result = locked(true, unlockBenchCommand());

    Expect(result).toEqual(false);
  }
}
