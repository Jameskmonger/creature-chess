// tslint:disable:jsx-ban-props
import * as React from "react";

import Div100vh from "react-div-100vh";
import Media from "react-media";

import { DesktopGame } from "./layouts/desktop/DesktopGame";
import { MobileGame } from "./layouts/mobile/MobileGame";

const GamePage: React.FunctionComponent = () => (
	<Div100vh>
		<Media query="(orientation: landscape) and (min-width: 1200px)">
			<DesktopGame />
		</Media>

		<Media query="(orientation: landscape) and (max-width: 1199px) and (min-width: 600px)">
			<MobileGame />
		</Media>

		<Media query="(orientation: portrait), (max-width: 599px)">
			<MobileGame />
		</Media>
	</Div100vh>
);

export { GamePage };