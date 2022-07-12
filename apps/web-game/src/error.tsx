import * as React from "react";

import { withErrorBoundary, useErrorBoundary } from "react-use-error-boundary";

const App = withErrorBoundary(({ children }) => {
	const [error, resetError] = useErrorBoundary();

	if (error) {
		return (
			<div>
				<p>{error.message}</p>
				<button onClick={resetError}>Try again</button>
			</div>
		);
	}

	return <div>{children}</div>;
});
