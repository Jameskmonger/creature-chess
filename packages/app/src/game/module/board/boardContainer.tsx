import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GamePhase } from "@creature-chess/models";
import { BoardState } from "@shoki/board";
import { BoardGrid } from "@shoki/board-react";
import { AppState } from "../../../store";
import { OpponentBoardPlaceholder } from "./overlays/opponentBoardPlaceholder";
import { VictoryOverlay } from "./overlays/victoryOverlay";
import { ReconnectOverlay } from "./overlays/reconnectOverlay";
import { MatchRewardsOverlay } from "./overlays/matchRewardsOverlay";
import { ReadyOverlay } from "./overlays/readyOverlay";
import { SpectatingOverlay } from "./overlays/spectatingOverlay";
import { NowPlaying } from "../nowPlaying";
import { onDropPiece, onTileClick } from "./tileInteraction";
import { GameBoard } from "./gameBoard";
import { InteractablePiece } from "../../components/piece/interactablePiece";

const BoardContainer: React.FunctionComponent<{ showNowPlaying?: boolean }> = ({ showNowPlaying = false }) => {
	const dispatch = useDispatch();

	// todo decouple this, make a playerDropPiece saga

	const board = useSelector<AppState, BoardState>(state => state.game.board);
	const bench = useSelector<AppState, BoardState>(state => state.game.bench);

	const inPreparingPhase = useSelector<AppState, boolean>(state => state.game.roundInfo.phase === GamePhase.PREPARING);
	const isSpectating = useSelector<AppState, boolean>(state => state.game.spectating.id !== null);

	const renderBenchPiece = (id: string) => <InteractablePiece id={id} />;

	return (
		<div className="group board-container style-default">
			{showNowPlaying && <NowPlaying />}

			<div className="chessboard">
				{inPreparingPhase && <OpponentBoardPlaceholder />}

				<GameBoard />

				<ReadyOverlay />
				<VictoryOverlay />
				<MatchRewardsOverlay />
				<ReconnectOverlay />
			</div>
			{
				isSpectating ?
					<SpectatingOverlay /> :
					<div className="bench">
						<BoardGrid
							state={bench}
							onDrop={onDropPiece(dispatch, "bench", board, bench)}
							onClick={onTileClick(dispatch, "bench")}
							// eslint-disable-next-line react/jsx-no-bind
							renderItem={renderBenchPiece}
						/>
					</div>
			}

		</div>
	);
};

export { BoardContainer };
