import React from "react";

import { getCookieValue } from "../utils/getCookieValue";

export function useCookie(cookieName: string) {
	const [cookie, setCookie] = React.useState(() => getCookieValue(cookieName));

	React.useEffect(() => {
		function handleCookieChange() {
			setCookie(getCookieValue(cookieName));
		}

		window.addEventListener("cookieChange", handleCookieChange);
		return () => {
			window.removeEventListener("cookieChange", handleCookieChange);
		};
	}, [cookieName]);

	return cookie;
}
