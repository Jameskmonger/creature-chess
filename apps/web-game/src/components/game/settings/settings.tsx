import * as React from "react";

import { Footer } from "../../ui/Footer";
import { QuitGameButton } from "./quitGameButton";

const Settings: React.FunctionComponent = () => (
	<div>
		<QuitGameButton />

		<Footer />
	</div>
);

export { Settings };
