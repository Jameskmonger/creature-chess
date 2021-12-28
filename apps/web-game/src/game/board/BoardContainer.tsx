import React from "react";
import { DndProvider } from "@shoki/board-react";
import { useGameMatchBoard } from "./hooks";
import { MatchBoard } from "./MatchBoard";
import { LocalBoard } from "./LocalBoard";
import { ReadyUpButton, ReadyOverlay, VictoryOverlay, MatchRewardsOverlay, ReconnectOverlay } from "./overlays";
import { NowPlaying } from "../module/nowPlaying";

export const BoardContainer: React.FC = () => {
	const matchBoard = useGameMatchBoard();

	return (
		<DndProvider>
			<div className="group board-container">
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
			</div>
		</DndProvider>
	);
}
