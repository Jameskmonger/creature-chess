import * as React from "react";

import { AnimationLayer } from "./animations";

const BASE_STYLE: React.CSSProperties = {
	width: "100%",
	height: "100%",
};

const getCssVariableStyle = (
	cssVariables: Record<string, string | number>
): React.CSSProperties => {
	const result: Record<string, string | number> = {
		width: "100%",
		height: "100%",
	};

	for (const [key, value] of Object.entries(cssVariables)) {
		result[`--${key}`] = value;
	}

	return result as React.CSSProperties;
};

export function AnimationLayerDiv({
	layer,
	onEnd,
	children,
}: {
	layer: AnimationLayer | undefined;
	onEnd: (name: string) => void;
	children: React.ReactNode;
}) {
	const handleAnimationEnd = React.useCallback(
		(event: React.AnimationEvent<HTMLDivElement>) => {
			// only handle events from this div, not bubbled from children
			if (event.currentTarget === event.target && layer) {
				onEnd(layer.name);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[layer?.name, onEnd]
	);

	return (
		<div
			className={layer?.className}
			style={layer?.cssVariables ? getCssVariableStyle(layer.cssVariables) : BASE_STYLE}
			onAnimationEnd={layer ? handleAnimationEnd : undefined}
		>
			{children}
		</div>
	);
}
