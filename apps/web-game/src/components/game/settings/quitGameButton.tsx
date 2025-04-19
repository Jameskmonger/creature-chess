import * as React from "react";

import { useDispatch } from "react-redux";

import { PlayerActions } from "@creature-chess/gamemode";

const QuitGameButton: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const [areYouSure, setAreYouSure] = React.useState<boolean>(false);

	const onClick = areYouSure
		? () => {
				dispatch(PlayerActions.quitGamePlayerAction());
			}
		: () => {
				setAreYouSure(true);
			};

	if (!areYouSure) {
		return <button onClick={onClick}>Quit Game</button>;
	}

	return <button onClick={onClick}>Click again to quit</button>;
};

export { QuitGameButton };
