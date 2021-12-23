import * as React from "react";
import useFetch from "use-http";

const LeaderboardContents: React.FunctionComponent<{ data: any }> = ({ data }) => (
	<>
		<table className="leaderboard">
			<thead>
				<tr>
					<td>Player</td>
					<td>Wins</td>
				</tr>
			</thead>
			<tbody>
				{
					data.map(
						({ wins, name }, index) => (
							<tr key={`${index}-${name}`}><td>{name}</td><td>{wins}</td></tr>
						)
					)
				}
			</tbody>
		</table>

		<div className="wipe-warning">
			<p>Thanks so much for playing! I hope you're enjoying the game</p>
			<p>Please don't get too attached to these scores for now</p>
			<p>The user accounts will be wiped during development</p>
		</div>
	</>
);

const LEADERBOARD_ENDPOINT = `${process.env.API_INFO_URL}/leaderboard`;

const Leaderboard: React.FunctionComponent = () => {
	// const { loading, error, data = [] } = useFetch(LEADERBOARD_ENDPOINT, {}, []);

	return (
		<div className="segment">
			<div className="header">Leaderboard</div>
			<div className="content">
				{/* {
					loading
					&& <span>Loading</span>
				}

				{
					!loading
					&& <LeaderboardContents data={data} />
				} */}
				<span>Down for maintenance</span>
			</div>
		</div>
	);
};

export { Leaderboard };
