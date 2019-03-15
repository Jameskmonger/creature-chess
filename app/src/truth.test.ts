import { TestFixture, Test, Expect } from "alsatian";

@TestFixture("Truth test")
export class TruthTest {

    @Test("true should be truthy")
    public trueShouldBeTruthy() {
        Expect(true).toBeTruthy();
    }
}