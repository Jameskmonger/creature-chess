import { CardShop } from "./cardShop/CardShop";
import React from "react";
import { Layout } from "@creature-chess/ui";


const BoardAndBench: React.FunctionComponent = () => {
	const money = 100;

	return (
		<Layout.Layout
			className="board-and-bench"
			direction="column"
		>
			<h3>UserInterface</h3>
			<p>board</p>
			<p>bench</p>

			<div className="card-shop-container">
				<CardShop
					devMode={true}
				/>
			</div>
		</Layout.Layout>
	);
};


export { BoardAndBench };
