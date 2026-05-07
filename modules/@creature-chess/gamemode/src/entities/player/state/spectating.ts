import { networkedAction } from "../../../events/networkedAction";

export type SpectatingState = {
	id: string | null;
};

export const initialSpectatingState: SpectatingState = {
	id: null,
};

export const setSpectatingIdCommand = networkedAction<
	string | null,
	"spectating/setSpectatingIdCommand"
>("spectating/setSpectatingIdCommand");
