import { TestFixture, Test, SpyOn, Expect } from "alsatian";
import io = require("socket.io");
import { openServer } from "./openServer";

@TestFixture()
export class OpenServerTest {
    @Test()
    public shouldReturnSocketServer() {
        const spy = SpyOn(io, "listen");

        const port = 43594;

        spy.andCall(((_port, options) => {
            if (
                _port !== port
                || !options
                || !options.transports
                || options.transports[0] !== "websocket"
                || options.transports[1] !== "polling"
            ) {
                return null;
            }

            return "test-pass";
        }) as any);

        // this is really ugly but an easy way to check it's doing the right thing :/
        const result = openServer(port);
        Expect(result).toEqual("test-pass");

        spy.restore();
    }
}
