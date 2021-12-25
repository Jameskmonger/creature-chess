import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GamePhase } from "@creature-chess/models";
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
import { PieceWrapper } from "./PieceWrapper";
import { InteractablePiece } from "./InteractablePiece";

const boardSelector = (state: AppState) => state.game.board;
const benchSelector = (state: AppState) => state.game.bench;

const BoardContainer: React.FunctionComponent<{ showNowPlaying?: boolean }> = ({ showNowPlaying = false }) => {
	const dispatch = useDispatch();

	// todo decouple this, make a playerDropPiece saga

	const board = useSelector(boardSelector);
	const bench = useSelector(benchSelector);

	const inPreparingPhase = useSelector<AppState, boolean>(state => state.game.roundInfo.phase === GamePhase.PREPARING);
	const isSpectating = useSelector<AppState, boolean>(state => state.game.spectating.id !== null);

	const renderBenchPiece = (id: string) => <PieceWrapper id={id} boardSelectors={[benchSelector]}><InteractablePiece /></PieceWrapper>;

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
				{
					isSpectating ?
						<SpectatingOverlay />
						:
						<BoardGrid
							state={bench}
							onDrop={onDropPiece(dispatch, "bench", board, bench)}
							onClick={onTileClick(dispatch, "bench")}
							// eslint-disable-next-line react/jsx-no-bind
							renderItem={renderBenchPiece}
						/>
				}
			</div>

		</div>
	);
};

export { BoardContainer };
