const CURRENT_USER_ENDPOINT = `${APP_API_URL}/user/current`;

export const getCurrentUser = (token: string) =>
	fetch(CURRENT_USER_ENDPOINT, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": token,
		},
	});
