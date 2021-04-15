import { IncomingPacketRegistry } from "./incoming-packet-registry";

enum Opcodes {
    MOCK_OPCODE = 1
}

type Definitions = {
    [Opcodes.MOCK_OPCODE]: { foo: number }
};

type Acknowledgements = {
    [Opcodes.MOCK_OPCODE]: never
};

describe('IncomingPacketRegistry', () => {
    const registerListener = jest.fn()
    const registry = new IncomingPacketRegistry<Definitions, Acknowledgements>(registerListener);

    beforeEach(() => {
        registerListener.mockReset();
    });

    test('should call registerListener with opcode and handler', () => {
        const handler = () => { };

        registry.on(Opcodes.MOCK_OPCODE, handler);

        expect(registerListener).toHaveBeenCalledWith(Opcodes.MOCK_OPCODE, handler);
    });
});
