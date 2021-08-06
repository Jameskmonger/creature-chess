import React from "react";
import { BoardGrid } from "@shoki/board-react";
import { useSelector } from "react-redux";
import { DevState } from "../../store/store";
import { BoardState } from "../../../../../@shoki/board/lib";
import { UninteractablePiece } from "../../uninteractablePiece/uninteractablePiece";

const renderUninteractablePiece = (id: string) => (<UninteractablePiece id={id} />);

const DevBoard: React.FunctionComponent = () => {
	const board = useSelector<DevState, BoardState>(state => state.board);
	const onClick = (one: number, two: number) => {
		console.log("YAY!");
	}
	return (
		<div className="dev-board">
			<h1>Board</h1>
			<BoardGrid
				state={board}
				renderItem={renderUninteractablePiece}
				onClick={onClick}
			/>
		</div>
	);
};


export { DevBoard };
