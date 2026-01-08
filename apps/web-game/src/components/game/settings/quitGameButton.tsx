import * as React from "react";

import { useDispatch } from "react-redux";

import { PlayerActions } from "@creature-chess/gamemode";
import { Button } from "~/components/ui";

export function QuitGameButton() {
	const dispatch = useDispatch();
	const [areYouSure, setAreYouSure] = React.useState<boolean>(false);

	const onClick = areYouSure
		? () => {
			dispatch(PlayerActions.quitGamePlayerAction());
		}
		: () => {
			setAreYouSure(true);
		};

	return (
		<Button
			color="primary"
			size="medium"
			onClick={onClick}
		>
			{areYouSure ? "Click again to quit" : "Quit Game"}
		</Button>
	)
}
