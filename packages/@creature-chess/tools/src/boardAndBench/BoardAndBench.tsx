import { CardShop } from "./cardShop/CardShop";
import { Card as CardModel, CreatureType, DefinitionClass } from "@creature-chess/models";
import React from "react";
import { Layout } from "@creature-chess/ui/lib/layout";
import { DevBoard } from "./board/DevBoard";
import { DndProvider } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";

import "./_board.scss";
import { DevBench } from "./bench/DevBench";


const BoardAndBench: React.FunctionComponent = () => {
	const money = 100;

	return (
		<DndProvider backend={MultiBackend} options={HTML5toTouch}>

			<Layout
				className="board-and-bench"
				direction="column"
			>
				<h3>UserInterface</h3>
				<DevBoard />
				<DevBench />
				<div className="card-shop-container">
					<CardShop
						devMode={true}
					/>
				</div>
			</Layout>
		</DndProvider>
	);
};


export { BoardAndBench };
