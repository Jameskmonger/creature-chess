import React from "react";

import { useDispatch } from "react-redux";

import { AUTH0_ENABLED } from "@cc-web/auth/auth0/config";
import { LocalPlayer } from "@cc-web/auth/player";

import { useCookie } from "../hooks/useCookie";
import { openConnection } from "./saga";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useAuth0 = AUTH0_ENABLED ? require("@auth0/auth0-react").useAuth0 : null;

/**
 * Open a connection to the game server using the auth0 token.
 */
export function useOpenAuth0Connection() {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();
	const dispatch = useDispatch();

	React.useEffect(() => {
		const open = async () => {
			try {
				const accessToken = await getAccessTokenSilently();
				dispatch(openConnection({ type: "auth0", data: { accessToken } }));
			} catch (e) {
				console.log({ error: e });
			}
		};

		open();
	}, [isAuthenticated, getAccessTokenSilently, dispatch]);
}

export function useOpenGuestConnection() {
	const dispatch = useDispatch();

	// read cookie "guest-token"
	const cookie = useCookie("guest-token");

	React.useEffect(() => {
		if (!cookie) {
			console.error("tries to open guest connection without cookie");
			return;
		}

		const open = async () => {
			try {
				dispatch(
					openConnection({ type: "guest", data: { accessToken: cookie } })
				);
			} catch (e) {
				console.log({ error: e });
			}
		};

		open();
	}, [cookie, dispatch]);
}

export function useOpenConnection(localPlayer: LocalPlayer | null) {
	if (!localPlayer) {
		return;
	}

	if (localPlayer.type === "guest") {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		return useOpenGuestConnection();
	}

	if (localPlayer.type === "user" && useAuth0) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		return useOpenAuth0Connection();
	}

	throw new Error("No connection method available");
}
