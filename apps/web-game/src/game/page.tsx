// tslint:disable:jsx-ban-props
import * as React from "react";
import { DndProvider } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import Media from "react-media";
import { ResponsiveBoardStyles } from "./module";
import { MobileGame } from "./layouts/mobileGame";
import { DesktopGame } from "./layouts/desktopGame";
import { useDispatch } from "react-redux";
import { openConnection } from "../networking";
import { useAuth0 } from "@auth0/auth0-react";

const GamePage: React.FunctionComponent = () => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();
	const dispatch = useDispatch();

	React.useEffect(() => {
		const open = async () => {
			const idToken = await getAccessTokenSilently();

			dispatch(openConnection({ idToken }));
		};

		open();
	}, [isAuthenticated, getAccessTokenSilently]);

	return (
		<DndProvider backend={MultiBackend} options={HTML5toTouch}>
			<ResponsiveBoardStyles />

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
};

export {
	GamePage
};
