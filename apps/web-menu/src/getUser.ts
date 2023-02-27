const CURRENT_USER_ENDPOINT = `${process.env.API_INFO_URL}/user/current`;

export const getCurrentUser = (token: string) =>
	fetch(CURRENT_USER_ENDPOINT, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": token,
		},
	});
