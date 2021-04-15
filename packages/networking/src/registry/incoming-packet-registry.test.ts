import { OutgoingPacketRegistry } from "./outgoing-packet-registry";

enum Opcodes {
    MOCK_OPCODE = 1,
    MOCK_OPCODE_WITH_ACK = 2
}

type Definitions = {
    [Opcodes.MOCK_OPCODE]: { foo: number },
    [Opcodes.MOCK_OPCODE_WITH_ACK]: { bar: string }
};

type Acknowledgements = {
    [Opcodes.MOCK_OPCODE]: never,
    [Opcodes.MOCK_OPCODE_WITH_ACK]: () => void
};

describe("OutgoingPacketRegistry", () => {
    const emitFn = jest.fn();
    const registry = new OutgoingPacketRegistry<Definitions, Acknowledgements>(emitFn);

    beforeEach(() => {
        emitFn.mockReset();
    });

    test("should call emitFn with opcode and payload", () => {
        const payload = { foo: 3 };

        registry.emit(Opcodes.MOCK_OPCODE, payload);

        expect(emitFn).toHaveBeenCalledWith(Opcodes.MOCK_OPCODE, payload);
    });

    describe("when ack provided", () => {
        const ack = () => { /* empty */ };

        test("should call emitFn with opcode and payload", () => {
            const payload = { bar: "blablabla" };

            registry.emit(Opcodes.MOCK_OPCODE_WITH_ACK, payload, ack);

            expect(emitFn).toHaveBeenCalledWith(Opcodes.MOCK_OPCODE_WITH_ACK, payload, ack);
        });
    });
});
