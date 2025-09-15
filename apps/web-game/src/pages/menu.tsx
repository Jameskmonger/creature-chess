import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { SplashScreen } from "~/components/SplashScreen";
import { LoadingScreen } from "~/components/ui/LoadingScreen";
import { openConnection } from "~/networking";
import { AppState } from "~/store";

export function MenuPage({ error }: { error?: string }) {
	const dispatch = useDispatch();

	const loadingMessage = useSelector(
		(state: AppState) => state.menu.loadingMessage
	);

	const onFindGameClick = React.useCallback(
		() => dispatch(openConnection()),
		[dispatch]
	);

	if (loadingMessage) {
		return <LoadingScreen message={loadingMessage} />;
	}

	return (
		<SplashScreen onPlay={onFindGameClick} />
	);
}
