import React, { useEffect, useMemo, useState } from "react";

import { LocalPlayerContextProvider } from "../context";
import { LocalPlayer } from "../player";

/**
 * Load a guest session from the server
 */
function useGuestSession() {
	const [guestId, setGuestId] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function get() {
			const response = await fetch(
				process.env.API_INFO_URL + "/guest/session",
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				setLoading(false);
				setError("Failed to create guest session");
				return;
			}

			const { id } = await response.json();
			setGuestId(id);
			setLoading(false);
		}

		get();
	}, []);

	const session = useMemo(() => ({ id: guestId }), [guestId]);

	return {
		error,
		loading,
		session,
	};
}

export function GuestAuthProvider({ children }: { children: React.ReactNode }) {
	const { session, loading, error } = useGuestSession();

	const player: LocalPlayer = useMemo(
		() => ({
			type: "guest",
			id: session?.id || "",
			nickname: "Guest",
		}),
		[session]
	);

	if (error) {
		return <div>{error}</div>;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!session) {
		return <div>Failed to create guest session</div>;
	}

	return (
		<LocalPlayerContextProvider value={player}>
			{children}
		</LocalPlayerContextProvider>
	);
}
