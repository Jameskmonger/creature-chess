import React from "react";
import { DndProvider } from "@shoki/board-react";
import { useGameMatchBoard } from "./hooks";
import { MatchBoard } from "./MatchBoard";
import { LocalBoard } from "./LocalBoard";
import { ReadyUpButton, ReadyOverlay, VictoryOverlay, MatchRewardsOverlay, ReconnectOverlay } from "./overlays";
import { NowPlaying } from "../module/nowPlaying";
import { Group } from "@creature-chess/ui";

export const BoardContainer: React.FC = () => {
	const matchBoard = useGameMatchBoard();

	return (
		<DndProvider>
			<Group className="board-container">
				<NowPlaying />

				<ReadyUpButton />

				{
					matchBoard
						? <MatchBoard />
						: <LocalBoard />
				}

				<>
					<ReadyOverlay />
					<VictoryOverlay />
					<MatchRewardsOverlay />
					<ReconnectOverlay />
				</>
			</Group>
		</DndProvider>
	);
}
