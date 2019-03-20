import { Expect, Test, TestFixture } from "alsatian";

@TestFixture("Truth")
export class TruthTests {

    @Test()
    public shouldBeTrue() {
        Expect(true).toBeTruthy();
    }
}
