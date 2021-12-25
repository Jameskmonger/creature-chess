// tslint:disable:jsx-ban-props
import * as React from "react";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import Media from "react-media";
import { MobileGame } from "./layouts/mobileGame";
import { DesktopGame } from "./layouts/desktopGame";

const GamePage: React.FunctionComponent = () => (
	<DndProvider options={HTML5toTouch}>
		<Media query="(orientation: landscape) and (min-width: 1200px)">
			<DesktopGame />
		</Media>

		<Media query="(orientation: landscape) and (max-width: 1199px) and (min-width: 600px)">
			<MobileGame />
		</Media>

		<Media query="(orientation: portrait), (max-width: 599px)">
			<MobileGame />
		</Media>
	</DndProvider>
);

export {
	GamePage
};
