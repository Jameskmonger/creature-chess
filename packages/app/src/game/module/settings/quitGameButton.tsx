import * as React from "react";
import { useDispatch } from "react-redux";
import { PlayerGameActions } from "@creature-chess/gamemode";

const QuitGameButton: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const [areYouSure, setAreYouSure] = React.useState<boolean>(false);

	const onClick = (
		areYouSure
			? () => {
				dispatch(PlayerGameActions.quitGamePlayerAction());
			}
			: () => {
				setAreYouSure(true);
			}
	);

	if (!areYouSure) {
		return <button onClick={onClick} className="button">Quit Game</button>;
	}

	return <button onClick={onClick} className="button">Click again to quit</button>;
};

export { QuitGameButton };
