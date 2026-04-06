import * as React from "react";

import { AnimationLayer } from "./animations";

const getCssVariableStyle = (
	cssVariables?: Record<string, string | number>
): React.CSSProperties => {
	const result: Record<string, string | number> = {
		width: "100%",
		height: "100%",
	};

	if (cssVariables) {
		for (const [key, value] of Object.entries(cssVariables)) {
			result[`--${key}`] = value;
		}
	}

	return result as React.CSSProperties;
};

export function AnimationLayerDiv({
	layer,
	onEnd,
	children,
}: {
	layer: AnimationLayer;
	onEnd: (name: string) => void;
	children: React.ReactNode;
}) {
	const handleAnimationEnd = React.useCallback(
		(event: React.AnimationEvent<HTMLDivElement>) => {
			// only handle events from this div, not bubbled from children
			if (event.currentTarget === event.target) {
				onEnd(layer.name);
			}
		},
		[layer.name, onEnd]
	);

	return (
		<div
			className={layer.className}
			style={getCssVariableStyle(layer.cssVariables)}
			onAnimationEnd={handleAnimationEnd}
		>
			{children}
		</div>
	);
}
