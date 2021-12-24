import * as React from "react";
import { Footer } from "@creature-chess/ui";
import { QuitGameButton } from "./quitGameButton";

const Settings: React.FunctionComponent = () => (
	<div className="settings">
		<QuitGameButton />

		<Footer />
	</div>
);

export { Settings };
