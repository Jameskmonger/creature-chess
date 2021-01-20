import io = require("socket.io-client");
import { AuthenticateResponse } from "@creature-chess/shared";

export const getSocket = (serverIP: string, idToken: string) => {
    // force to websocket for now until CORS is sorted
    const socket = io(
        serverIP,
        {
            transports: ["websocket", "xhr-polling"],
            reconnectionAttempts: 15,
            reconnectionDelay: 100,
            reconnectionDelayMax: 1000
        }
    );

    return new Promise<SocketIOClient.Socket>((resolve, reject) => {
        socket.on("connect", () => {
            socket.emit("authenticate", { idToken });
        });

        const onAuthenticated = ({ error }: AuthenticateResponse) => {
            if (!error) {
                socket.off("authenticate_response", onAuthenticated);

                resolve(socket);

                return;
            }

            socket.disconnect();

            // todo improve this
            reject(error);
        };

        socket.on("authenticate_response", onAuthenticated);
    });
};
