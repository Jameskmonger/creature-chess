import React from "react";

import { BotPersonalityValue } from "@cc-server/data";

import { useBotBrain } from "../context";
import { BotActions } from "./BotActions";

function BotPersonality() {
	const {
		value: { personality },
		setPersonality,
	} = useBotBrain();

	return (
		<div>
			<h2>Personality</h2>

			<table>
				<tbody>
					<tr>
						<td>Composure</td>
						<td>{personality.composure}</td>
						<td>
							<input
								type="range"
								min="0"
								max="200"
								value={personality.composure}
								onChange={(e) => {
									const value = parseInt(e.target.value, 10);
									setPersonality({
										...personality,
										composure: value as BotPersonalityValue,
									});
								}}
							/>
						</td>
					</tr>
					<tr>
						<td>Ambition</td>
						<td>{personality.ambition}</td>
						<td>
							<input
								type="range"
								min="0"
								max="200"
								value={personality.ambition}
								onChange={(e) => {
									const value = parseInt(e.target.value, 10);
									setPersonality({
										...personality,
										ambition: value as BotPersonalityValue,
									});
								}}
							/>
						</td>
					</tr>
					<tr>
						<td>Vision</td>
						<td>{personality.vision}</td>
						<td>
							<input
								type="range"
								min="0"
								max="200"
								value={personality.vision}
								onChange={(e) => {
									const value = parseInt(e.target.value, 10);
									setPersonality({
										...personality,
										vision: value as BotPersonalityValue,
									});
								}}
							/>
						</td>
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
