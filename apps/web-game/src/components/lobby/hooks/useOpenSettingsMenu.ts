import { useState, useRef, useCallback, useEffect, useMemo } from "react";

import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

const CLICK_COUNT_REQUIRED = 3;

/**
 * Hook to open the settings menu when the user clicks on some target element
 * a certain number of times.
 *
 * @returns An object containing the ref of the target element and a boolean
 * indicating whether the menu is open.
 */
export function useOpenSettingsMenu() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [clickCount, setClickCount] = useState(0);
	const targetRef = useRef<HTMLDivElement>(null);

	const onTargetClick = useCallback(() => {
		if (menuOpen) {
			return;
		}

		setClickCount((prev) => prev + 1);
	}, [menuOpen]);

	const onTargetClickOutside = useCallback(() => {
		if (menuOpen) {
			return;
		}

		setClickCount(0);
	}, [menuOpen]);

	useEffect(() => {
		if (clickCount >= CLICK_COUNT_REQUIRED) {
			setMenuOpen(true);
		}
	}, [clickCount]);

	useEffect(() => {
		const div = targetRef.current;

		div?.addEventListener("click", onTargetClick);

		return () => {
			div?.removeEventListener("click", onTargetClick);
		};
	}, [targetRef, onTargetClick]);

	useOnClickOutside(targetRef, onTargetClickOutside);

	return useMemo(
		() => ({
			targetRef,
			menuOpen,
		}),
		[targetRef, menuOpen]
	);
}
