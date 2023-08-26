import * as React from "react";

import { Group, Layout } from "@cc-web/ui";
import { DiscordIcon } from "@cc-web/ui/misc";
import { Header2, Header4 } from "@cc-web/ui/text";
import { useSelector } from "react-redux";

import { PlayerMatchRewards } from "@creature-chess/gamemode";

import { AppState } from "../../../store";
import { BoardOverlay } from "./boardOverlay";

const MatchRewardsOverlay: React.FunctionComponent = () => {
	const matchRewards = useSelector<AppState, PlayerMatchRewards | null>(
		(state) => state.game.playerInfo.matchRewards
	);
	const victoryOverlayShowing = useSelector<AppState, boolean>(
		(state) => state.game.ui.winnerId !== null
	);
	const spectatingPlayer = useSelector<AppState, boolean>(
		(state) => state.game.spectating.id !== null
	);

	if (!matchRewards || victoryOverlayShowing || spectatingPlayer) {
		return null;
	}

	const {
		damage,
		justDied,
		rewardMoney: { total, base, winBonus, streakBonus, interest },
	} = matchRewards;

	if (justDied) {
		return (
			<BoardOverlay>
				<Layout direction="column">
					<Header2>You died</Header2>
					<Header4>{damage} health lost</Header4>
					<DiscordIcon />
				</Layout>
			</BoardOverlay>
		);
	}

	if (damage === 0) {
		return (
			<BoardOverlay>
				<Layout direction="column">
					<Header2>Round Won</Header2>
					<Group>
						<Header4>${total} gained</Header4>

						<ul>
							<li>Base: ${base}</li>
							<li>Win Bonus: ${winBonus}</li>
							<li>Streak Bonus: ${streakBonus}</li>
							<li>Interest (10%): ${interest}</li>
						</ul>
					</Group>
				</Layout>
			</BoardOverlay>
		);
	}

	return (
		<BoardOverlay>
			<Layout direction="column">
				<Header2>Round Lost</Header2>
				<Header4>{damage} health lost</Header4>
				<Group>
					<Header4>${total} gained</Header4>

					<ul>
						<li>Base: ${base}</li>
						<li>Win Bonus: ${winBonus}</li>
						<li>Streak Bonus: ${streakBonus}</li>
						<li>Interest (10%): ${interest}</li>
					</ul>
				</Group>
			</Layout>
		</BoardOverlay>
	);
};

export { MatchRewardsOverlay };
