import * as React from "react";

import {
	faChevronRight,
	faCircleQuestion,
	faGear,
	faHouse,
	faNewspaper,
	faPlay,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import {
	AccountPill,
	MenuBanner,
	MenuHeaderBar,
	MenuNav,
	MenuPlayButton,
	Panel,
	type MenuNavItem,
} from "@creature-chess/ui";

import { useSocketManager } from "~/networking";
import { getAvailableCreatureIds } from "~/networking/creatureDefinitions";
import { useSession } from "~/networking/sessionSources";
import { Region } from "~/plugins";
import { createUseThemeStyles } from "~/useStyles";

import { PageBoardBackground } from "../PageBackground";
import { UpdateNotes } from "../game/UpdateNotes";
import { Help } from "../game/help";
import { CreatureStrip } from "./CreatureStrip";
import { MenuSettings } from "./MenuSettings";
import {
	BOOT_MENU_FADE_DELAY_MS,
	BOOT_MENU_FADE_MS,
	BootEntranceContext,
} from "./bootEntrance";

type View = "home" | "profile" | "help" | "updates" | "settings";

const STRIP_CREATURE_COUNT = 5;

const pickRandomCreatureIds = (count: number): number[] => {
	const pool = getAvailableCreatureIds();
	for (let i = pool.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[pool[i], pool[j]] = [pool[j], pool[i]];
	}
	return pool.slice(0, count);
};

const NAV_ITEMS = [
	{ key: "home", label: "Home", icon: <FontAwesomeIcon icon={faHouse} /> },
	{ key: "profile", label: "Profile", icon: <FontAwesomeIcon icon={faUser} /> },
	{ key: "help", label: "Help", icon: <FontAwesomeIcon icon={faCircleQuestion} /> },
] as const satisfies readonly MenuNavItem[];

/**
 * Left-to-right order that the different menu views sit in, for
 * the purpose of determining which direction to slide when switching views.
 */
const VIEW_ORDER: readonly View[] = [
	"home",
	"profile",
	"help",
	"updates",
	"settings",
];

const useStyles = createUseThemeStyles((theme) => ({
	"root": {
		position: "relative",
		overflow: "hidden",
		width: "100%",
		height: "100%",
		boxSizing: "border-box",
	},
	"foreground": {
		position: "absolute",
		inset: 0,
		boxSizing: "border-box",
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem",
		padding: "0.5rem",
	},
	"foregroundEntering": {
		// Fades in once the splash logo has finished fading out.
		animation: `$menuFadeIn ${BOOT_MENU_FADE_MS}ms ease ${BOOT_MENU_FADE_DELAY_MS}ms both`,
	},
	"@keyframes menuFadeIn": {
		from: { opacity: 0 },
		to: { opacity: 1 },
	},
	"viewport": {
		position: "relative",
		flex: 1,
		minHeight: 0,
		overflow: "hidden",
	},
	"layer": {
		position: "absolute",
		inset: 0,
		display: "flex",
		flexDirection: "column",
		overflowY: "auto",
	},
	"layerCenter": {
		justifyContent: "center",
	},
	"enterRight": { animation: "$slideInRight 300ms ease both" },
	"enterLeft": { animation: "$slideInLeft 300ms ease both" },
	"exitLeft": { animation: "$slideOutLeft 300ms ease both" },
	"exitRight": { animation: "$slideOutRight 300ms ease both" },
	"@keyframes slideInRight": {
		from: { transform: "translateX(calc(100% + 1rem))" },
		to: { transform: "translateX(0)" },
	},
	"@keyframes slideInLeft": {
		from: { transform: "translateX(calc(-100% - 1rem))" },
		to: { transform: "translateX(0)" },
	},
	"@keyframes slideOutLeft": {
		from: { transform: "translateX(0)" },
		to: { transform: "translateX(calc(-100% - 1rem))" },
	},
	"@keyframes slideOutRight": {
		from: { transform: "translateX(0)" },
		to: { transform: "translateX(calc(100% + 1rem))" },
	},
	"card": {
		display: "flex",
		flexDirection: "column",
		gap: "0.75rem",
		width: "100%",
		maxWidth: "460px",
		margin: "0 auto",
		padding: "1rem",
		boxSizing: "border-box",
		background: theme.palette.surface,
		borderRadius: "0.9rem",
	},
	"body": {
		display: "flex",
		flexDirection: "column",
		gap: "0.75rem",
	},
	"placeholder": {
		color: theme.palette.muted,
		textAlign: "center",
		padding: "2rem 1rem",
		fontSize: "1.2rem",
	},
}));

function MenuAccount({ onClick }: { onClick: () => void }) {
	// Never null as the guest source is always available.
	const session = useSession()!;
	const picture = session?.picture ?? null;

	return (
		<AccountPill
			name={session?.name ?? "Guest"}
			avatar={picture ? <img src={picture} alt="" /> : undefined}
			icon={picture ? undefined : <FontAwesomeIcon icon={faUser} />}
			onClick={onClick}
		/>
	);
}

export function GameMenu() {
	const classes = useStyles();
	const socketManager = useSocketManager();
	const entering = React.useContext(BootEntranceContext);

	const [view, setView] = React.useState<View>("home");
	const [prev, setPrev] = React.useState<{ view: View; dir: 1 | -1 } | null>(
		null
	);

	const goTo = React.useCallback(
		(next: View) => {
			if (next === view) {
				return;
			}
			const dir =
				VIEW_ORDER.indexOf(next) > VIEW_ORDER.indexOf(view) ? 1 : -1;
			setPrev({ view, dir });
			setView(next);
		},
		[view]
	);

	const onPlay = React.useCallback(
		() => socketManager.connect(),
		[socketManager]
	);

	const onShowUpdates = React.useCallback(() => goTo("updates"), [goTo]);

	const creatureIds = React.useMemo(
		() => pickRandomCreatureIds(STRIP_CREATURE_COUNT),
		[]
	);

	const navActive = NAV_ITEMS.find((item) => item.key === view)?.key ?? null;

	const renderView = (v: View) => {
		switch (v) {
			case "home":
				return (
					<div className={classes.card}>
						<CreatureStrip definitionIds={creatureIds} />

						<Region
							cls="menu-card-body"
							ctx={{ onPlay, onShowUpdates, version: APP_VERSION }}
						>
							<div className={classes.body}>
								<MenuPlayButton
									icon={<FontAwesomeIcon icon={faPlay} />}
									title="Quick play"
									subtitle="Casual · 8 players · no account needed"
									onClick={onPlay}
								/>
								<MenuBanner
									icon={<FontAwesomeIcon icon={faNewspaper} />}
									label="What's new"
									suffix={`· patch ${APP_VERSION}`}
									chevron={<FontAwesomeIcon icon={faChevronRight} />}
									onClick={onShowUpdates}
								/>
							</div>
						</Region>
					</div>
				);
			case "profile":
				return (
					<Region cls="menu-profile" ctx={{}}>
						<Panel>
							<div className={classes.placeholder}>
								Sign in to view your profile.
							</div>
						</Panel>
					</Region>
				);
			case "help":
				return (
					<Panel>
						<Help onBack={() => goTo("home")} />
					</Panel>
				);
			case "updates":
				return (
					<Panel>
						<UpdateNotes onBack={() => goTo("home")} />
					</Panel>
				);
			case "settings":
				return <MenuSettings onBack={() => goTo("home")} />;
			default:
				return null;
		}
	};

	const layerClass = (v: View, anim?: string) =>
		classNames(
			classes.layer,
			{ [classes.layerCenter]: v === "home" || v === "profile" },
			anim
		);

	return (
		<div className={classes.root}>
			<PageBoardBackground />

			<div
				className={classNames(classes.foreground, {
					[classes.foregroundEntering]: entering,
				})}
			>
				<MenuHeaderBar
					brand={
						<img
							src={`${APP_IMAGE_ROOT}/ui/logo.png`}
							alt="Creature Chess Logo"
						/>
					}
					account={
						<Region cls="menu-account" ctx={{}}>
							<MenuAccount onClick={() => goTo("profile")} />
						</Region>
					}
					settingsIcon={<FontAwesomeIcon icon={faGear} />}
					onOpenSettings={() => goTo("settings")}
				/>

				<div className={classes.viewport}>
					{prev && (
						<div
							key={prev.view}
							className={layerClass(
								prev.view,
								prev.dir === 1 ? classes.exitLeft : classes.exitRight
							)}
							onAnimationEnd={(e) => {
								if (e.target === e.currentTarget) {
									setPrev(null);
								}
							}}
						>
							{renderView(prev.view)}
						</div>
					)}
					<div
						key={view}
						className={layerClass(
							view,
							prev
								? prev.dir === 1
									? classes.enterRight
									: classes.enterLeft
								: undefined
						)}
					>
						{renderView(view)}
					</div>
				</div>

				<MenuNav items={NAV_ITEMS} active={navActive} onSelect={goTo} />
			</div>
		</div>
	);
}
