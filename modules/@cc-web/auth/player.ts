import { UserDTO } from "@creature-chess/models/dto/user";

type Guest = {
	type: "guest";

	id: string;
	nickname: string;
};

type User = {
	type: "user";
} & UserDTO;

export type LocalPlayer = Guest | User;
