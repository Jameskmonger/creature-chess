import * as React from "react";

import { useSelector } from "react-redux";
import { GameMenu } from "~/components/menu/GameMenu";
import { LoadingScreen } from "~/components/ui/LoadingScreen";
import { AppState } from "~/store";

export function MenuPage({ error }: { error?: string }) {
	const loadingMessage = useSelector(
		(state: AppState) => state.menu.loadingMessage
	);

	if (loadingMessage) {
		return <LoadingScreen message={loadingMessage} />;
	}

	return (
		<GameMenu />
	);
}
