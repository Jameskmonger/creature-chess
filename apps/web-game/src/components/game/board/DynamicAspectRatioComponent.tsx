import React, { useRef, useEffect, useCallback, useState } from "react";

/**
 * This component will adjust its size to maintain the given aspect ratio,
 * while filling its parent container as much as possible.
 *
 * @param aspectRatio The aspect ratio to maintain
 */
export function DynamicAspectRatioComponent({
	aspectRatio,
	children,
	containerRef,
	className,
}: {
	aspectRatio: number;
	children: React.ReactNode;
	containerRef: React.RefObject<HTMLElement>;
	className?: string;
}) {
	const [width, setWidth] = useState("100%");
	const [height, setHeight] = useState("100%");

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
				setWidth("100%");
				setHeight(`${containerWidth / aspectRatio}px`);
			} else {
				// Height bound
				setWidth(`${containerHeight * aspectRatio}px`);
				setHeight("100%");
			}
		}
	}, [aspectRatio, containerRef]);

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
	}, [adjustComponentSize, containerRef]);

	return (
		<div
			ref={componentRef}
			style={{
				width,
				height,
				position: "relative",
			}}
			className={className}
		>
			{children}
		</div>
	);
}
