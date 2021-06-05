import { AppState } from "@auth0/auth0-react";
import { PlayerActions } from "@creature-chess/gamemode";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SpectatingOverlay: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const spectatingId = useSelector<AppState, string>(state => state.game.spectating.id);
	const spectatingName = useSelector<AppState, string>(state =>
		state.game.playerList.find(player =>
			player.id === spectatingId).name
	);

	const stopSpectating = () => {
		dispatch(PlayerActions.spectatePlayerAction({ playerId: null }));
	};
	return (
		<section className="spectating-overlay">
			<h1 className="spectating-header">SPECTATING</h1>
			<p>You are currently spectating {spectatingName} </p>
			<button onClick={stopSpectating}>Stop Spectating</button>
		</section>
	);
};

export { SpectatingOverlay };
