import React from "react";

export function useElementSize() {
	const [width, setWidth] = React.useState(0);
	const [height, setHeight] = React.useState(0);

	const ref = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		if (ref.current) {
			setWidth(ref.current.clientWidth);
			setHeight(ref.current.clientHeight);
		}
	}, [ref]);

	const storeSize = React.useCallback(() => {
		if (ref.current) {
			setWidth(ref.current.clientWidth);
			setHeight(ref.current.clientHeight);
		}
	}, [ref]);

	React.useEffect(() => {
		if (!ref.current) {
			return;
		}

		// wait 10ms to let everything render
		setTimeout(storeSize, 10);

		if (typeof ResizeObserver === "function") {
			const resizeObserver = new ResizeObserver(storeSize);
			resizeObserver.observe(ref.current);

			return () => {
				resizeObserver.disconnect();
			};
		}

		window.addEventListener("resize", storeSize);

		return () => {
			window.removeEventListener("resize", storeSize);
		};
	}, [ref, storeSize]);

	const isPortrait = React.useMemo(() => width < height, [width, height]);
	const size = React.useMemo(() => ({ width, height }), [width, height]);

	return {
		isPortrait,
		size,
		ref,
	};
}
