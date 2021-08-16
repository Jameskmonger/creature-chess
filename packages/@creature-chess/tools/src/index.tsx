import React from "react";
import ReactDOM from "react-dom";


const DevTools: React.FunctionComponent = () => {
	console.log();
	return (
		<div>
			<h1>Hello world!</h1>
		</div>
	);
};

ReactDOM.render(<DevTools />, document.getElementById("root"));

export { DevTools };
