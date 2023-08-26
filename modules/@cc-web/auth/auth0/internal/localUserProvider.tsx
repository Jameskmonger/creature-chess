import React from "react";

import { LocalPlayerContextProvider } from "../../context";
import { useLocalUserDTO } from "./useLocalUserDto";

/**
 * Provides the local user (from auth0) to the LocalPlayerContext
 */
export const Auth0LocalUserProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { user } = useLocalUserDTO();

	if (!user) {
		return (
			<LocalPlayerContextProvider value={null}>
				{children}
			</LocalPlayerContextProvider>
		);
	}

	const player = {
		...user,
		type: "user" as const,
	};

	return (
		<LocalPlayerContextProvider value={player}>
			{children}
		</LocalPlayerContextProvider>
	);
};
