import React from "react";

export function useElementSize() {
	const [size, setSize] = React.useState([0, 0]);

	const rowRef = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		if (rowRef.current) {
			setSize([rowRef.current.clientWidth, rowRef.current.clientHeight]);
		}
	}, [rowRef]);

	const isPortrait = React.useMemo(() => size[1] > size[0], [size]);

	return {
		isPortrait,
		size: { width: size[0], height: size[1] },
		ref: rowRef,
	};
}
