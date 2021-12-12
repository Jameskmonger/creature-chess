import * as React from "react";
import ReactModal from "react-modal";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "./display/loading";
import { GamePage } from "./game";

ReactModal.setAppElement("#approot");

const App: React.FunctionComponent = () => {
	const { isLoading } = useAuth0();

	if (isLoading) {
		return <Loading />;
	}

	return <GamePage />;
};

export { App };
