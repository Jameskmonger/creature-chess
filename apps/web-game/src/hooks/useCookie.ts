import React from "react";

function getCookieValue(name: string) {
	const value = "; " + document.cookie;
	const parts = value.split("; " + name + "=");
	if (parts.length === 2) {
		return parts.pop()!.split(";").shift();
	}

	return null;
}

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
