import React from "react";

export function useElementSize() {
	const [size, setSize] = React.useState([0, 0]);

	const ref = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		if (ref.current) {
			setSize([ref.current.clientWidth, ref.current.clientHeight]);
		}
	}, [ref]);

	const storeSize = React.useCallback(() => {
		if (ref.current) {
			setSize([ref.current.clientWidth, ref.current.clientHeight]);
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
	}, [ref]);

	const isPortrait = React.useMemo(() => size[1] > size[0], [ref, size]);

	return {
		isPortrait,
		size: { width: size[0], height: size[1] },
		ref,
	};
}
