import React from "react";

import { useBotBrain } from "../context";
import { BotActions } from "./BotActions";

function BotPersonality() {
	const { personality } = useBotBrain();

	return (
		<div>
			<h2>Personality</h2>

			<table>
				<tbody>
					<tr>
						<td>Composure</td>
						<td>{personality.composure}</td>
					</tr>
					<tr>
						<td>Ambition</td>
						<td>{personality.ambition}</td>
					</tr>
					<tr>
						<td>Vision</td>
						<td>{personality.vision}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export function BotBrainInfo() {
	return (
		<div>
			<h1>Info</h1>

			<hr />

			<BotPersonality />

			<hr />

			<BotActions />
		</div>
	);
}
