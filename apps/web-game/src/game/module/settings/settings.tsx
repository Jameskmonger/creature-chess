import * as React from "react";
import { Footer } from "../../../display";
import { QuitGameButton } from "./quitGameButton";

const Settings: React.FunctionComponent = () => {
	return (
		<div className="settings">
			<QuitGameButton />

			<Footer />
		</div>
	);
};

export { Settings };
