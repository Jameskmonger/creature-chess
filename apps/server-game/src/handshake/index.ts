import { logger } from "../log";
import { AuthenticatedSocket } from "../player/socket";
import { handshakeListener } from "./listener";
import { failHandshake, successHandshake } from "./response";
import { HandshakeListenerDependencies } from "./types";

const INFO_API_URL =
	process.env.INFO_API_INTERNAL_URL ?? "http://server-info:3000";

type ValidatedGuest = {
	id: string;
	profilePicture: number;
};

async function validateGuestToken(
	token: string
): Promise<ValidatedGuest | null> {
	try {
		const response = await fetch(`${INFO_API_URL}/guest/validate`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token }),
		});

		if (!response.ok) {
			return null;
		}

		return (await response.json()) as ValidatedGuest;
	} catch (e) {
		logger.error("Failed to reach server-info for token validation", {
			error: e,
		});
		return null;
	}
}

/**
 * Listen for incoming connections, process the handshake, and raise any connections that pass.
 *
 * @param onReceive The callback for sockets that pass handshake.
 */
export const onHandshakeSuccess = (
	deps: HandshakeListenerDependencies,
	onReceive: (socket: AuthenticatedSocket) => void
) => {
	handshakeListener(deps, async (socket, request) => {
		try {
			if (request.type === "guest") {
				const guest = await validateGuestToken(request.data.accessToken);

				if (!guest) {
					failHandshake(socket, { error: { type: "authentication" } });
					return;
				}

				logger.info(`[socket ${socket.id}] Handshake successful for guest`);

				successHandshake(socket);

				const guestSocket = socket as AuthenticatedSocket;

				guestSocket.data = {
					type: "guest",
					id: guest.id,
					nickname: `Guest ${guest.id}`,
					profile: {
						picture: guest.profilePicture,
						title: null,
					},
				};

				onReceive(guestSocket);

				return;
			}

			failHandshake(socket, { error: { type: "not_registered" } });

			return;
		} catch (e) {
			logger.error(`[socket ${socket.id}] Handshake failed`, { error: e });
			failHandshake(socket, { error: { type: "authentication" } });
		}
	});
};
