import { useIsGuestQuery } from "./guest";

type AuthCallback =
	({ type: "login", idToken: string })
	| ({ type: "guest" });

export function useGameAuth() {
	const isGuestQuery = useIsGuestQuery();

	const { isAuthenticated, getAccessTokenSilently } = useAuth0();
	const [loadingMessage, setLoadingMessage] = React.useState("loading...");

	React.useEffect(() => {
		const open = async () => {
			setLoadingMessage("getting access token");
			try {
				const idToken = await getAccessTokenSilently();

				setLoadingMessage("opening connection");
				dispatch(openConnection({ idToken }));
			} catch (e) {
				console.log({ error: e });
			}
		};

		open();
	}, [isAuthenticated, getAccessTokenSilently, dispatch]);

	return {
		loadingMessage,
	};
}
