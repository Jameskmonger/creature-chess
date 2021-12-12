import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Leaderboard } from "./leaderboard";
import { Footer, Loading } from "./display";

const Navbar: React.FunctionComponent = () => {
	const { logout } = useAuth0();
	const onLogoutClick = () => logout();

	return (
		<nav className="navbar">
			<button className="sign-out" onClick={onLogoutClick}>Log Out</button>
		</nav>
	);
};

export const MenuPage: React.FC<{ error?: string }> = ({ error }) => {
	const [loading, setLoading] = React.useState(false);

	const onFindGameClick = () => {

	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="menu">
			<Navbar />

			<div className="join-game">
				<h2 className="title">Creature Chess</h2>

				<div className="blurb">
					<p>More fun with friends! Press "Find Game" at the same time to play together</p>
					<p>Up to 8 players!</p>
				</div>

				<button onClick={onFindGameClick} className="find-game">Find Game</button>

				<div className="blurb">
					<p>Join us on Discord to receive notifications when someone starts a lobby, and more!</p>
				</div>

				<a href="https://discord.gg/FhMm6saehb"><img src="https://i.imgur.com/OBo2QRd.png" className="discord-button" /></a>

				<div className="blurb">
					<p>This is a <span className="highlight">multiplayer strategy game</span> in which you configure creatures on a board.</p>
					<p>Each round, your board is matched against an opponent's board. Defeat all their pieces to win the round.</p>
					<p>Every loss decreases your health bar. When your health reaches zero, you're out!</p>
					<p>Players will battle against eachother until only one player remains.</p>
					<p>Good luck! <span className="highlight">~ jkm</span></p>
				</div>

				{
					error
					&& <div className="error"><p>{error}</p></div>
				}
			</div>

			<Leaderboard />

			<Footer />
		</div>
	);
};
