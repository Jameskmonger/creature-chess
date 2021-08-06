import React from "react";
import { useSelector } from "react-redux";
import { DevState } from "../..";
import { BoardGrid } from "../../../../../@shoki/board-react/lib";
import { BoardState } from "../../../../../@shoki/board/lib";
import { PieceModel } from "../../../../models/lib";
import { UninteractablePiece } from "../../uninteractablePiece/uninteractablePiece";

const renderUninteractablePiece = (id: string) => (<UninteractablePiece id={id} />);

const DevBench: React.FunctionComponent = () => {
	const bench = useSelector<DevState, BoardState>(state => state.bench);
	const onClick = (one: number, two: number) => {
		console.log("Yaaaay");
	}
	return (
		<div>
			<BoardGrid
				state={bench}
				renderItem={renderUninteractablePiece}
				onClick={onClick}
			/>
		</div>
	);
};


export { DevBench };
