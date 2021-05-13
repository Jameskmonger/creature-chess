import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { LOBBY_WAIT_TIME, MAX_PLAYERS_IN_GAME, TITLES } from "@creature-chess/models";
import { LobbyPlayer } from "@creature-chess/models";
import { Countdown } from "../display/countdown";
import { Footer } from "../display/footer";

const padNumberToTwo = (val: number) => val < 10 ? `0${val}` : val.toString();

const countdownRender = (totalSecondsRemaining: number) => {
	const minutesRemaining = Math.floor(totalSecondsRemaining / 60);
	const secondsRemaining = Math.ceil(totalSecondsRemaining % 60);

	const time = `${minutesRemaining}:${padNumberToTwo(secondsRemaining)}`;

	return (
		<div className="timeRemaining">
			Game starting in <span className="time">{time}</span>
		</div>
	);
};

const LobbyPage: React.FunctionComponent = () => {
	const lobbyId = useSelector<AppState, string>(state => state.lobby.lobbyId);
	const players = useSelector<AppState, LobbyPlayer[]>(state => state.lobby.players);
	const lobbyStartingAtMs = useSelector<AppState, number>(state => state.lobby.startingAtMs);

	if (lobbyId === null) {
		return <div>An error occured, please refresh your page</div>;
	}

	const botElements: React.ReactNode[] = [];

	for (let i = players.length; i < MAX_PLAYERS_IN_GAME; i++) {
		botElements.push(
			<div key={i} className="player bot">
				<span className="name">empty slot</span>
			</div>
		);
	}

	return (
		<div className="lobby">
			<div className="lobby-info">
				{
					lobbyStartingAtMs
					&& (
						<Countdown
							countdownToSeconds={lobbyStartingAtMs / 1000}
							render={countdownRender}
						/>
					)
				}

				<h2 className="lobby-id">Lobby ID: {lobbyId}</h2>

				<p><strong>tip:</strong> you can always sell your pieces back for their costs. Don't be afraid to change your team!</p>

				<p><strong>tip:</strong> building a balanced team is key to winning. Check out the help page to see type advantages!</p>

				<div className="players">
					{
						players.map(p => (
							<div key={p.id} className="player">
								<span className="name">{p.name}</span>
								{p.profile?.title && <span className={`player-profile-title ${TITLES[p.profile.title].className}`}>{TITLES[p.profile.title].text}</span>}
							</div>
						))
					}

					{botElements}
				</div>

				<p>
					The game will start {LOBBY_WAIT_TIME} seconds after the lobby is created,
					or immediately when there are {MAX_PLAYERS_IN_GAME} players
				</p>
			</div>

			<Footer />
		</div>
	);
};

export { LobbyPage };
