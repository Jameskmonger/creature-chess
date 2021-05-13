import * as React from "react";
import { useSelector } from "react-redux";
import { PieceModel } from "@creature-chess/models";
import { getPiece } from "@creature-chess/gamemode";
import { AppState } from "../../../../store";
import { Healthbar } from "./components/healthbar";
import { StageIndicator } from "./components/StageIndicator";
import { TypeIndicator } from "./components/TypeIndicator";

const PieceMeta: React.FunctionComponent<{ id: string; pieceIsOnBench?: boolean }> = ({ id, pieceIsOnBench = false }) => {
	const piece = useSelector<AppState, PieceModel>(state => getPiece(state.game, id));

	return (
		<div className="piece-meta-container">
			<div className="piece-meta">
				<TypeIndicator type={piece.definition.type} />

				<div className="health-bar-container">
					<Healthbar pieceId={id} vertical pieceIsOnBench={pieceIsOnBench} />

					<StageIndicator pieceId={id} />
				</div>
			</div>
			<div className="piece-meta-top" />
		</div>
	);
};

export { PieceMeta };
