import { CardShop } from "./cardShop/CardShop";
import { Card as CardModel, CreatureType, DefinitionClass } from "@creature-chess/models";
import React from "react";
import { Layout } from "@creature-chess/ui";
import { DevBoard } from "./board/DevBoard";
import { DndProvider } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";

import "./board/_board.scss";
import { DevBench } from "./bench/DevBench";

const BoardAndBench: React.FunctionComponent = () => (
	<DndProvider backend={MultiBackend} options={HTML5toTouch}>
		<Layout.Layout
			className="board-and-bench"
			direction="column"
		>
			<div className="board-container">
				<DevBoard />
			</div>
			<div className="board-container">
				<DevBench />
			</div>
			<div className="card-shop-container">
				<CardShop
					devMode={true}
				/>
			</div>
		</Layout.Layout>
	</DndProvider>
);


export { BoardAndBench };
