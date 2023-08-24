import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useIsGuestQuery } from "./guest";
import { openConnection } from "./networking";

export function useGameAuth() {
	const dispatch = useDispatch();

	const isGuestQuery = useIsGuestQuery();

	const { isAuthenticated, getAccessTokenSilently } = useAuth0();
	const [loadingMessage, setLoadingMessage] = useState("loading...");

	useEffect(() => {
		const open = async () => {
			setLoadingMessage("getting access token");
			try {
				const idToken = await getAccessTokenSilently();

				setLoadingMessage("opening connection");
				dispatch(openConnection({ type: "auth0", data: { accessToken: idToken } }));
			} catch (e) {
				console.log({ error: e });
			}
		};

		const guest = async () => {
			setLoadingMessage("joining as guest");
			dispatch(openConnection({ type: "guest" }));
		};

		if (isGuestQuery) {
			guest();
			return;
		} else {
			open();
			return;
		}
	}, [isAuthenticated, getAccessTokenSilently, dispatch, isGuestQuery]);

	return {
		loadingMessage,
	};
}
