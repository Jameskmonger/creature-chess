import React from "react";
import ReactDOM from "react-dom";
import * as constants from "@creature-chess/models";


const DevTools: React.FunctionComponent = () => {
	console.log();
	return (
		<div>
			<h1>It costs {constants.BUY_XP_COST} dollars to buy xp</h1>
		</div>
	);
};

ReactDOM.render(<DevTools />, document.getElementById("root"));

export { DevTools };
