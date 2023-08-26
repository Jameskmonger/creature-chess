import { useMemo } from "react";

export function useGuestMode() {
	const queryString = window.location.search;

	return useMemo(() => {
		const params = new URLSearchParams(queryString);
		return params.get("guest") === "true";
	}, [queryString]);
}
