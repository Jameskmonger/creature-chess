import { AsyncTest, Expect, SpyOn, Test, TestCase, TestFixture } from "alsatian";

@TestFixture("Truth")
export class TruthTests {

    @Test()
    public shouldBeTrue() {
        Expect(true).toBeTruthy();
    }
}