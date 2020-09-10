import { TestFixture, Test, Expect } from "alsatian";
import { lockBench, unlockBench } from "../benchActions";
import { locked } from "./lockedReducer";

@TestFixture()
export class LockedReducerTests {
  @Test()
  public initialStateShouldBeFalse() {
    const result = locked(undefined, { type: "foo" } as any);

    Expect(result).toEqual(false);
  }

  @Test()
  public lockBenchShouldReturnTrue() {
    const result = locked(false, lockBench());

    Expect(result).toEqual(true);
  }

  @Test()
  public unlockBenchShouldReturnFalse() {
    const result = locked(true, unlockBench());

    Expect(result).toEqual(false);
  }
}
