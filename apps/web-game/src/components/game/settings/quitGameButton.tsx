import * as React from "react";

import { Button } from "~/components/ui";
import { useGameActions } from "~/networking";

export function QuitGameButton() {
	const gameActions = useGameActions();
	const [areYouSure, setAreYouSure] = React.useState<boolean>(false);

	const onClick = React.useCallback(() => {
		if (areYouSure) {
			gameActions.quitGame();
		} else {
			setAreYouSure(true);
		}
	}, [areYouSure, gameActions]);

	return (
		<Button color="primary" size="medium" onClick={onClick}>
			{areYouSure ? "Click again to quit" : "Quit Game"}
		</Button>
	);
}
