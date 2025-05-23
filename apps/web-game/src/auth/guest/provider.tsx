import React, { useEffect, useMemo, useState } from "react";

import { LocalPlayer } from "../LocalPlayer";
import { LocalPlayerContextProvider } from "../context";

/**
 * Load a guest session from the server
 */
function useGuestSession() {
	const [guestId, setGuestId] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function get() {
			const response = await fetch(APP_API_URL + "/guest/session", {
				headers: {
					"Content-Type": "application/json",
				},
			});

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
			nickname: "Guest " + (session?.id || ""),
		}),
		[session]
	);

	if (error || loading || !session) {
		return null;
	}

	return (
		<LocalPlayerContextProvider value={player}>
			{children}
		</LocalPlayerContextProvider>
	);
}
