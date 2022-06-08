import * as React from "react";
import { Footer } from "@creature-chess/ui";
import { QuitGameButton } from "./quitGameButton";

const Settings: React.FunctionComponent = () => (
	<div>
		<QuitGameButton />

		<Footer />
	</div>
);

export { Settings };
