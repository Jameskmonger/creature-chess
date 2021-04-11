import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragObjectWithType } from "react-dnd";
import { Dispatch } from "redux";
import { GamePhase, PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { PlayerActions } from "@creature-chess/shared";
import { BoardState, BoardSelectors } from "@creature-chess/board";
import { AppState } from "../../../store";
import { OpponentBoardPlaceholder } from "./overlays/opponentBoardPlaceholder";
import { VictoryOverlay } from "./overlays/victoryOverlay";
import { ReconnectOverlay } from "./overlays/reconnectOverlay";
import { MatchRewardsOverlay } from "./overlays/matchRewardsOverlay";
import { BoardGrid } from "../../../board/BoardGrid";
import { clearSelectedPiece } from "../../../ui/actions";
import { NowPlaying } from "../nowPlaying";
import { PieceComponent } from "./piece/pieceComponent";

const getLocationForPiece = (pieceId: string, board: BoardState, bench: BoardState): PlayerPieceLocation => {
    if (board) {
        const boardPiecePosition = BoardSelectors.getPiecePosition(board, pieceId);

        if (boardPiecePosition) {
            return {
                type: "board",
                location: boardPiecePosition
            }
        }
    }

    if (bench) {
        const benchPiecePosition = BoardSelectors.getPiecePosition(bench, pieceId);

        if (benchPiecePosition !== undefined) {
            return {
                type: "bench",
                location: benchPiecePosition
            }
        }
    }

    return null;
};

const onDropPiece = (dispatch: Dispatch<any>, locationType: "board" | "bench", board: BoardState, bench: BoardState) =>
    (item: DragObjectWithType, x: number, y: number) => {
        const piece: PieceModel = (item as any).piece;
        const from = getLocationForPiece(piece.id, board, bench);

        const location: PlayerPieceLocation = {
            type: locationType,
            location: { x, y }
        };

        // todo `from` is here as a safety check, is it needed?
        dispatch(PlayerActions.playerDropPieceAction(piece.id, from, location));
        dispatch(clearSelectedPiece());
    };

const onTileClick = (dispatch: Dispatch<any>, locationType: "board" | "bench") =>
    (x: number, y: number) => dispatch(PlayerActions.playerClickTileAction({ type: locationType, location: { x, y } }));

const BoardContainer: React.FunctionComponent<{ showNowPlaying?: boolean }> = ({ showNowPlaying = false }) => {
    const dispatch = useDispatch();

    // todo decouple this, make a playerDropPiece saga
    const board = useSelector<AppState, BoardState>(state => state.board);
    const bench = useSelector<AppState, BoardState>(state => state.bench);

    const selectedPieceId = useSelector<AppState, string>(state => state.ui.selectedPieceId);
    const inPreparingPhase = useSelector<AppState, boolean>(state => state.game.phase === GamePhase.PREPARING);

    return (
        <div className="group board-container style-default">
            { showNowPlaying && <NowPlaying />}

            <div className="chessboard">
                {inPreparingPhase && <OpponentBoardPlaceholder />}

                <div className="board-tiles">
                    <BoardGrid
                        state={board}
                        onDrop={onDropPiece(dispatch, "board", board, bench)}
                        onClick={onTileClick(dispatch, "board")}
                        renderItem={id => (
                            <PieceComponent
                                id={id}
                                draggable={inPreparingPhase}
                                animate={!inPreparingPhase}
                                selected={id === selectedPieceId}
                                pieceIsOnBench={false}
                            />
                        )}
                    />
                </div>

                <VictoryOverlay />
                <MatchRewardsOverlay />
                <ReconnectOverlay />
            </div>

            <div className="bench">
                <BoardGrid
                    state={bench}
                    onDrop={onDropPiece(dispatch, "bench", board, bench)}
                    onClick={onTileClick(dispatch, "bench")}
                    renderItem={id => (
                        <PieceComponent
                            id={id}
                            draggable
                            animate={false}
                            selected={id === selectedPieceId}
                            pieceIsOnBench
                        />
                    )}
                />
            </div>
        </div>
    );
};

export { BoardContainer };
