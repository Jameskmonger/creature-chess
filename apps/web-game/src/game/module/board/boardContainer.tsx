import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GamePhase, PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { AppState } from "../../../store";
import { OpponentBoardPlaceholder } from "./overlays/opponentBoardPlaceholder";
import { VictoryOverlay } from "./overlays/victoryOverlay";
import { ReconnectOverlay } from "./overlays/reconnectOverlay";
import { MatchRewardsOverlay } from "./overlays/matchRewardsOverlay";
import { ReadyOverlay } from "./overlays/readyOverlay";
import { NowPlaying } from "../nowPlaying";
import { InteractablePiece } from "./InteractablePiece";
import { GameBoard, GameBoardContextProvider, GameBoardLocation, PieceContextProvider } from "@creature-chess/ui";
import { usePlayerId } from "@creature-chess/auth-web";
import { PlayerActions } from "@creature-chess/gamemode";
import { BoardState } from "@shoki/board";
import { getLocationForPiece } from "./getLocationForPiece";
import { clearSelectedPiece } from "../../ui";
import { playerClickTileAction } from "./sagas/clickTileSaga";

const boardSelector = (state: AppState) => state.game.board;
const benchSelector = (state: AppState) => state.game.bench;
const matchBoardSelector = (state: AppState) => state.game.match.board;

const useOnDropPiece = (board: BoardState<PieceModel>, bench: BoardState<PieceModel>) => {
	const dispatch = useDispatch();

	return ({ id, location }: { id: string, location: GameBoardLocation }) => {
		const from = getLocationForPiece(id, board, bench);

		if (!from) {
			return;
		}

		const loc: PlayerPieceLocation = {
			type: location.locationType,
			location: {
				x: location.x,
				y: (location as any).y || null
			}
		};

		// todo `from` is here as a safety check, is it needed?
		dispatch(PlayerActions.dropPiecePlayerAction({
			pieceId: id,
			from,
			to: loc
		}));

		dispatch(clearSelectedPiece());
	};
};

const useOnClickTile = () => {
	const dispatch = useDispatch();

	return ({ location }: { location: GameBoardLocation }) => {
		const tile: PlayerPieceLocation = {
			type: location.locationType,
			location: {
				x: location.x,
				y: (location as any).y || null
			}
		};

		dispatch(
			playerClickTileAction({ tile })
		);
	};
};

const BoardContainer: React.FunctionComponent<{ showNowPlaying?: boolean }> = ({ showNowPlaying = false }) => {
	const viewingPlayerId = usePlayerId();

	const board = useSelector(boardSelector);
	const bench = useSelector(benchSelector);
	const matchBoard = useSelector(matchBoardSelector);
	const boardToUse = matchBoard || board;

	const onClickTile = useOnClickTile();
	const onDropPiece = useOnDropPiece(boardToUse, bench);

	const inPreparingPhase = useSelector<AppState, boolean>(state => state.game.roundInfo.phase === GamePhase.PREPARING);

	const renderPiece = (piece: PieceModel) => <PieceContextProvider value={{ piece, viewingPlayerId }}><InteractablePiece /></PieceContextProvider>;

	return (
		<div className="group board-container style-default">
			{showNowPlaying && <NowPlaying />}
			{inPreparingPhase && <OpponentBoardPlaceholder />}

			<GameBoardContextProvider
				value={{
					board: boardToUse,
					bench
				}}
			>
				<GameBoard
					onClick={onClickTile}
					onDropPiece={onDropPiece}

					renderBoardPiece={renderPiece}
					renderBenchPiece={renderPiece}
				/>
			</GameBoardContextProvider>

			<ReadyOverlay />
			<VictoryOverlay />
			<MatchRewardsOverlay />
			<ReconnectOverlay />
		</div >
	);
};

export { BoardContainer };
