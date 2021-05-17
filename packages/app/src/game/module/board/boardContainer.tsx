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
import { NowPlaying } from "../nowPlaying";
import { PieceComponent } from "./piece/pieceComponent";
import { onDropPiece, onTileClick } from "./tileInteraction";
import { GameBoard } from "./gameBoard";

const BoardContainer: React.FunctionComponent<{ showNowPlaying?: boolean }> = ({ showNowPlaying = false }) => {
	const dispatch = useDispatch();

	// todo decouple this, make a playerDropPiece saga

	const board = useSelector<AppState, BoardState>(state => state.game.board);
	const bench = useSelector<AppState, BoardState>(state => state.game.bench);

	const selectedPieceId = useSelector<AppState, string | null>(state => state.game.ui.selectedPieceId);
	const inPreparingPhase = useSelector<AppState, boolean>(state => state.game.roundInfo.phase === GamePhase.PREPARING);

	const renderBenchPiece = (id: string) => (
		<PieceComponent
			id={id}
			draggable
			animate={false}
			selected={id === selectedPieceId}
			pieceIsOnBench
		/>
	);

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

			<div className="bench">
				<BoardGrid
					state={bench}
					onDrop={onDropPiece(dispatch, "bench", board, bench)}
					onClick={onTileClick(dispatch, "bench")}
					renderItem={renderBenchPiece}
				/>
			</div>
		</div>
	);
};

export { BoardContainer };
