import { useState, useLayoutEffect } from "react";

export const useTileWidth = (tileInnerRef: React.RefObject<HTMLDivElement>) => {
	const [tileWidth, setTileWidth] = useState(0);

	const handleResize = () => {
		if (!tileInnerRef.current) {
			return;
		}

		setTileWidth(tileInnerRef.current.offsetWidth);
	};

	useLayoutEffect(
		() => {
			if (!tileInnerRef.current) {
				return;
			}

			// wait 10ms to let everything render
			setTimeout(handleResize, 10);

			if (typeof ResizeObserver === "function") {
				const resizeObserver = new ResizeObserver(handleResize);
				resizeObserver.observe(tileInnerRef.current);

				return () => {
					resizeObserver.disconnect();
				};
			}

			window.addEventListener("resize", handleResize);

			return () => {
				window.removeEventListener("resize", handleResize);
			};
		},
		[tileInnerRef.current]
	);

	return tileWidth;
};
