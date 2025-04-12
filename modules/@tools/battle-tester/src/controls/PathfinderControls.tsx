import React from "react";

import { useDispatch } from "react-redux";

import { controlSlice, useAppSelector } from "../state";

export function PathfinderControls() {
	const dispatch = useDispatch();
	const state = useAppSelector((s) => s.controls.pathfinder);

	const onClickEnable = React.useCallback(() => {
		dispatch(controlSlice.actions.enablePathfinder());
	}, [dispatch]);

	const onClickDisable = React.useCallback(() => {
		dispatch(controlSlice.actions.disablePathfinder());
	}, [dispatch]);

	return (
		<div>
			<h2>Pathfinder</h2>
			<button onClick={state.enabled ? onClickDisable : onClickEnable}>
				{state.enabled ? "Disable" : "Enable"} Pathfinder
			</button>
			{state.enabled && (
				<div>
					{state.start === null && <p>Set start</p>}
					{state.start !== null && (
						<p>
							Start: {state.start.x}, {state.start.y}
						</p>
					)}
					{state.end !== null && (
						<p>
							End: {state.end.x}, {state.end.y}
						</p>
					)}
				</div>
			)}
		</div>
	);
}
