import { useAuth0 } from "@auth0/auth0-react";

export const useIdToken = () => {
	const { getAccessTokenSilently } = useAuth0();

	return getAccessTokenSilently();
};
