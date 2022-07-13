import * as React from "react";

import { useAppSelector } from "../state";

export function BoardLogger() {
	const board = useAppSelector((state) => state.board);

	const onClickLog = React.useCallback(() => {
		console.log(board);
	}, [board]);

	return <button onClick={onClickLog}>Log Board</button>;
}
