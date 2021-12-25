import * as React from "react";

const Loading: React.FunctionComponent = () => (
	<div className="loading-full">
		<h1>Loading...</h1>

		<p>This can sometimes take up to 30 secs (sorry! I'm using cheap and free servers)</p>
	</div>
);

export { Loading };
