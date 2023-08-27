import React, { useRef, useEffect, useCallback } from "react";

/**
 * This component will adjust its size to maintain the given aspect ratio,
 * while filling its parent container as much as possible.
 *
 * @param aspectRatio The aspect ratio to maintain
 */
export function DynamicAspectRatioComponent({
	aspectRatio,
	children,
}: {
	aspectRatio: number;
	children: React.ReactNode;
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const componentRef = useRef<HTMLDivElement>(null);

	const adjustComponentSize = useCallback(() => {
		const container = containerRef.current;
		const component = componentRef.current;

		if (container && component) {
			const containerWidth = container.clientWidth;
			const containerHeight = container.clientHeight;
			const containerAspectRatio = containerWidth / containerHeight;

			if (aspectRatio > containerAspectRatio) {
				// Width bound
				component.style.width = "100%";
				component.style.height = `${containerWidth / aspectRatio}px`;
			} else {
				// Height bound
				component.style.height = "100%";
				component.style.width = `${containerHeight * aspectRatio}px`;
			}
		}
	}, [aspectRatio]);

	useEffect(() => {
		// Initial adjustment
		adjustComponentSize();

		// Listen to window resize event for edge cases (like window resizing)
		window.addEventListener("resize", adjustComponentSize);

		// Observe size changes in the container
		const resizeObserver = new ResizeObserver(() => {
			adjustComponentSize();
		});

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => {
			window.removeEventListener("resize", adjustComponentSize);
			resizeObserver.disconnect();
		};
	}, [adjustComponentSize]);

	return (
		<div
			ref={containerRef}
			style={{ width: "100%", height: "100%", position: "relative" }}
		>
			<div
				ref={componentRef}
				// style={{ position: "absolute", background: "lightblue" }}
			>
				{children}
			</div>
		</div>
	);
}
