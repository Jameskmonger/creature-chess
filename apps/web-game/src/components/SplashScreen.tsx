import * as React from "react";

import { Spinner } from "@creature-chess/ui";
import classNames from "classnames";

import { createUseThemeStyles } from "~/useStyles";

import {
	BOOT_BG_FADE_MS,
	BOOT_LOGO_FADE_DELAY_MS,
	BOOT_LOGO_FADE_MS,
	BOOT_SHEEN_MS,
} from "./menu/bootEntrance";

const LOGO_SRC = `${APP_IMAGE_ROOT}/ui/logo.png`;

const useStyles = createUseThemeStyles((theme) => ({
	"overlay": {
		position: "fixed",
		inset: 0,
		zIndex: 1000,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		// Covers the app while booting/reconnecting; blocks clicks from reaching
		// the menu mounted behind it until the splash unmounts.
		pointerEvents: "auto",
	},
	"contentGameOut": {
		// Reconnecting into a game/lobby: the logo fades out first, while the
		// background still hides the game behind it.
		animation: `$bgFade ${BOOT_LOGO_FADE_MS}ms ease forwards`,
	},
	"blueGameOut": {
		// ...then the background fades, revealing the game only once the logo's gone.
		animation: `$bgFade ${BOOT_BG_FADE_MS}ms ease ${BOOT_LOGO_FADE_MS}ms both`,
	},
	"blue": {
		position: "absolute",
		inset: 0,
		background: theme.palette.background,
	},
	"blueOut": {
		animation: `$bgFade ${BOOT_BG_FADE_MS}ms ease forwards`,
	},
	"content": {
		position: "relative",
		zIndex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "2.5rem",
	},
	"contentOut": {
		// Waits for the background fade and the logo sheen, then fades out; the
		// menu fades in afterwards (see GameMenu).
		animation: `$bgFade ${BOOT_LOGO_FADE_MS}ms ease ${BOOT_LOGO_FADE_DELAY_MS}ms both`,
	},
	"logoWrap": {
		position: "relative",
		display: "inline-block",
		lineHeight: 0,
	},
	"logo": {
		display: "block",
		width: "min(60vw, 360px)",
		height: "auto",
		filter: "drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.45))",
	},
	"sheen": {
		position: "absolute",
		inset: 0,
		pointerEvents: "none",
		// Bright diagonal band, clipped to the logo's shape via the mask.
		background:
			"linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.85) 50%, transparent 60%)",
		backgroundSize: "300% 100%",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "100% 0",
		WebkitMaskImage: `url(${LOGO_SRC})`,
		maskImage: `url(${LOGO_SRC})`,
		WebkitMaskSize: "100% 100%",
		maskSize: "100% 100%",
		WebkitMaskRepeat: "no-repeat",
		maskRepeat: "no-repeat",
	},
	"sheenAnim": {
		// Sweeps once, after the background fade, before the crossfade.
		animation: `$logoSheen ${BOOT_SHEEN_MS}ms ease ${BOOT_BG_FADE_MS}ms both`,
	},
	"spinnerOut": {
		animation: `$bgFade ${BOOT_BG_FADE_MS}ms ease forwards`,
	},
	"footer": {
		position: "absolute",
		bottom: "1rem",
		left: 0,
		right: 0,
		zIndex: 1,
		textAlign: "center",
		fontFamily: theme.typography.primary,
		fontSize: "0.85rem",
		color: theme.palette.light.neutral,
	},
	"@keyframes bgFade": {
		from: { opacity: 1 },
		to: { opacity: 0 },
	},
	"@keyframes logoSheen": {
		from: { backgroundPosition: "100% 0" },
		to: { backgroundPosition: "0% 0" },
	},
}));

export function SplashScreen({
	entering,
	mode = "menu",
}: {
	entering?: boolean;
	mode?: "menu" | "game";
}) {
	const classes = useStyles();

	// The menu choreography crossfades the logo into the menu; the game path has
	// no menu behind it, so the whole splash fades out as one.
	const menuEntering = entering && mode === "menu";
	const gameFade = entering && mode === "game";

	return (
		<div className={classes.overlay}>
			<div
				className={classNames(classes.blue, {
					[classes.blueOut]: menuEntering,
					[classes.blueGameOut]: gameFade,
				})}
			/>
			<div
				className={classNames(classes.content, {
					[classes.contentOut]: menuEntering,
					[classes.contentGameOut]: gameFade,
				})}
			>
				<div className={classes.logoWrap}>
					<img className={classes.logo} src={LOGO_SRC} alt="Creature Chess" />
					<div
						className={classNames(classes.sheen, {
							[classes.sheenAnim]: menuEntering,
						})}
					/>
				</div>
				<div className={classNames({ [classes.spinnerOut]: menuEntering })}>
					<Spinner size={56} />
				</div>
			</div>
			<div
				className={classNames(classes.footer, {
					[classes.blueOut]: menuEntering,
					[classes.contentGameOut]: gameFade,
				})}
			>
				© Tiberisoft 2026
			</div>
		</div>
	);
}
