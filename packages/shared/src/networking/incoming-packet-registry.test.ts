import { TestFixture, Test, Expect, createFunctionSpy } from "alsatian";
import { IncomingPacketRegistry } from "./incoming-packet-registry";

const SOME_TEST_PACKET = "someTestPacket";
type TestPackets = {
    [SOME_TEST_PACKET]: { value: number }
};
type TestAcknowledgements = {
    [SOME_TEST_PACKET]: (val: string) => void,
};

@TestFixture("IncomingPacketRegistry")
export class IncomingPacketRegistryTests {
    @Test("should call register listener function")
    public shouldCallRegisterListenerFn() {
        const register = createFunctionSpy();

        const registry = new IncomingPacketRegistry<TestPackets, TestAcknowledgements>(register);

        const handler = (packet: { value: number }, ack: (val: string) => void) => { return; };
        registry.on(SOME_TEST_PACKET, handler);

        Expect(register).toHaveBeenCalledWith(SOME_TEST_PACKET, handler);
    }
}
