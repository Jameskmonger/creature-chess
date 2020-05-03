import { TestFixture, Test, Expect, createFunctionSpy, Any } from "alsatian";
import { OutgoingPacketRegistry } from "./outgoing-packet-registry";

const SOME_TEST_PACKET = "someTestPacket";
type TestPackets = {
    [SOME_TEST_PACKET]: { value: number }
};
type TestAcknowledgements = {
    [SOME_TEST_PACKET]: (val: string) => void
};

@TestFixture("OutgoingPacketRegistry")
export class OutgoingPacketRegistryTests {
    @Test("should call emit function with opcode and payload")
    public shouldCallEmitFn() {
        const emit = createFunctionSpy();

        const registry = new OutgoingPacketRegistry<TestPackets, TestAcknowledgements>(emit);

        const payload = { value: 3 };
        registry.emit(SOME_TEST_PACKET, payload);

        Expect(emit).toHaveBeenCalledWith(SOME_TEST_PACKET, payload);
    }

    @Test("should call emit function with ack if provided")
    public shouldCallEmitFnWithAck() {
        const emit = createFunctionSpy();

        const registry = new OutgoingPacketRegistry<TestPackets, TestAcknowledgements>(emit);

        const ack = (response: string) => { /* */ };
        registry.emit(SOME_TEST_PACKET, { value: 3 }, ack);

        Expect(emit).toHaveBeenCalledWith(Any(String), Any(Object), ack);
    }
}
