const CURRENT_USER_ENDPOINT = `${process.env.API_INFO_URL}/user/current`;

export const patchUser = (token: string, nickname: string, picture: number) => fetch(CURRENT_USER_ENDPOINT, {
	method: "PATCH",
	headers: {
		"Content-Type": "application/json",
		"Authorization": token
	},
	body: JSON.stringify({ nickname, picture })
});
