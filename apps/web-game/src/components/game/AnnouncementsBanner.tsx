import * as React from "react";

import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
	Announcement,
	dismissAnnouncement,
	selectAnnouncements,
} from "~/store/game/announcements";
import { getCreatureDefinitionById } from "~/networking/creatureDefinitions";
import { AppState } from "~/store";
import { createUseThemeStyles } from "~/useStyles";

import { LevelIcon } from "../ui/icon/LevelIcon";
import { StreakIndicator } from "./playerList/streakIndicator";

// Continuous ticker speed in px/s.
const SCROLL_SPEED = 90;

// Time in ms for the fade-in/out of the bar itself.
const FADE_MS = 320;

// Minimum gap between consecutive messages (px).
const MIN_BUFFER = 56;

const useStyles = createUseThemeStyles((theme) => ({
	banner: {
		position: "relative",
		width: "100%",
		// Fixed height keeps the bar constant regardless of message content (no
		// flicker) and, on the board, reserves layout space so it never shifts.
		height: "1.95rem",
		overflow: "hidden",
		background: `color-mix(in oklab, ${theme.palette.light.neutral} 4%, ${theme.palette.surface})`,
		borderTop: `1px solid color-mix(in oklab, ${theme.palette.accent.neutral} 22%, transparent)`,
		borderBottom: `1px solid color-mix(in oklab, ${theme.palette.light.neutral} 8%, transparent)`,
		fontFamily: theme.typography.primary,
		userSelect: "none",
		opacity: 0,
	},
	// On the overlays we don't reserve space; the bar collapses when idle and
	// pushes the overlay content down when a message is showing.
	collapsed: {
		height: 0,
	},
	item: {
		// Each message is positioned independently; the per-frame loop sets its
		// translateX. left:0 + top/bottom:0 centres content vertically.
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		display: "inline-flex",
		alignItems: "center",
		fontSize: "0.95rem",
		whiteSpace: "nowrap",
		willChange: "transform",
	},
	player: {
		color: theme.palette.primary.light,
		fontWeight: 700,
	},
	creature: {
		color: theme.palette.light.neutral,
		marginLeft: "0.4rem",
	},
	stars: {
		display: "inline-flex",
		alignItems: "center",
		gap: "2px",
		marginLeft: "0.45rem",
	},
	star: {
		height: "0.9em",
		width: "auto",
		display: "block",
	},
	levelIcon: {
		marginLeft: "0.4rem",
	},
	indicator: {
		marginLeft: "0.4rem",
	},
	eliminated: {
		color: theme.palette.muted,
		marginLeft: "0.4rem",
		fontStyle: "italic",
	},
}));

function AnnouncementBody({
	announcement,
	classes,
}: {
	announcement: Announcement;
	classes: Record<string, string>;
}) {
	switch (announcement.kind) {
		case "upgrade":
			return (
				<>
					<span className={classes.creature}>
						{getCreatureDefinitionById(announcement.definitionId)?.name ?? ""}
					</span>
					<span className={classes.stars}>
						{Array.from({ length: announcement.stage + 1 }, (_, i) => (
							<img
								key={i}
								className={classes.star}
								src={`${APP_IMAGE_ROOT}/ui/star.svg`}
								alt=""
							/>
						))}
					</span>
				</>
			);
		case "levelUp":
			return (
				<LevelIcon amount={announcement.level} className={classes.levelIcon} />
			);
		case "streak":
			return (
				<StreakIndicator
					type={announcement.streakType}
					amount={announcement.streakAmount}
					className={classes.indicator}
				/>
			);
		case "eliminated":
			return <span className={classes.eliminated}>Eliminated</span>;
		default:
			return null;
	}
}

export function AnnouncementsBanner() {
	const announcements = useSelector(selectAnnouncements);
	const players = useSelector((state: AppState) => state.game.players);
	const onBoard = useSelector<AppState, boolean>(
		(state) => state.game.ui.currentOverlay === null
	);
	const dispatch = useDispatch();
	const styles = useStyles();

	const nameById = React.useMemo(() => {
		const map = new Map<string, string>();
		for (const player of players) {
			map.set(player.id, player.name);
		}
		return map;
	}, [players]);

	const bannerRef = React.useRef<HTMLDivElement>(null);

	// Animation bookkeeping kept in refs so the per-frame loop never re-renders.
	const itemsRef = React.useRef(announcements);
	itemsRef.current = announcements;
	const scrollX = React.useRef(0);
	const lastTs = React.useRef<number | null>(null);
	const rafId = React.useRef<number | null>(null);
	// Per-message absolute position (left edge) in virtual scroll space, plus its
	// measured width. Screen x = startOffset - scrollX. Keyed by announcement id.
	const layoutRef = React.useRef(
		new Map<number, { startOffset: number; width: number }>()
	);

	const fadeRef = React.useRef<Animation | null>(null);
	const visibleRef = React.useRef(false);
	// Whether the bar occupies layout space. On overlays this stays true through
	// the fade-out (so the fade is visible), then collapses instantly.
	const [occupying, setOccupying] = React.useState(false);

	const step = React.useCallback(
		(ts: number) => {
			const banner = bannerRef.current;
			const list = itemsRef.current;

			if (list.length === 0 || !banner) {
				rafId.current = null;
				lastTs.current = null;
				scrollX.current = 0;
				layoutRef.current.clear();
				return;
			}

			if (lastTs.current === null) {
				lastTs.current = ts;
			}
			const dt = Math.min((ts - lastTs.current) / 1000, 0.05);
			lastTs.current = ts;
			scrollX.current += SCROLL_SPEED * dt;

			const layout = layoutRef.current;
			// Position each message independently from its own start offset.
			for (let i = 0; i < list.length; i++) {
				const entry = layout.get(list[i].id);
				const child = banner.children[i] as HTMLElement | undefined;
				if (!entry || !child) {
					continue;
				}
				child.style.transform = `translateX(${entry.startOffset - scrollX.current}px)`;
			}

			// The head is leftmost (smallest offset); dismiss it once fully off-left.
			const head = layout.get(list[0].id);
			if (head && head.startOffset + head.width - scrollX.current <= 0) {
				dispatch(dismissAnnouncement(list[0].id));
			}

			rafId.current = requestAnimationFrame(step);
		},
		[dispatch]
	);

	const hasItems = announcements.length > 0;

	// Drive the ticker whenever there is something queued.
	React.useEffect(() => {
		if (hasItems && rafId.current === null) {
			lastTs.current = null;
			rafId.current = requestAnimationFrame(step);
		}
	}, [hasItems, step]);

	React.useEffect(
		() => () => {
			if (rafId.current !== null) {
				cancelAnimationFrame(rafId.current);
			}
		},
		[]
	);

	// Assign a start offset to each new message (and drop departed ones) before
	// the browser paints, so each enters from the right with dynamic spacing.
	React.useLayoutEffect(() => {
		const banner = bannerRef.current;
		if (!banner) {
			return;
		}
		const layout = layoutRef.current;
		const viewportWidth = banner.clientWidth;

		const presentIds = new Set(announcements.map((a) => a.id));
		for (const id of layout.keys()) {
			if (!presentIds.has(id)) {
				layout.delete(id);
			}
		}

		for (let i = 0; i < announcements.length; i++) {
			const { id } = announcements[i];
			const child = banner.children[i] as HTMLElement | undefined;
			if (!child || layout.has(id)) {
				continue;
			}
			const width = child.offsetWidth;
			const prev = i > 0 ? layout.get(announcements[i - 1].id) : undefined;
			// Start at the right edge, or further right so it clears the previous
			// message by at least MIN_BUFFER — whichever is further right.
			const startOffset = prev
				? Math.max(
						viewportWidth + scrollX.current,
						prev.startOffset + prev.width + MIN_BUFFER
				  )
				: viewportWidth + scrollX.current;
			layout.set(id, { startOffset, width });
			// Position immediately so the first paint isn't at the left edge.
			child.style.transform = `translateX(${startOffset - scrollX.current}px)`;
		}
	}, [announcements]);

	// Fade the bar's opacity in/out. The bar stays mounted at a fixed height so the surrounding layout never shifts.
	React.useEffect(() => {
		const el = bannerRef.current;
		if (!el || hasItems === visibleRef.current) {
			return;
		}
		visibleRef.current = hasItems;

		// Expand immediately on appear, collapse only once the fade-out completes.
		if (hasItems) {
			setOccupying(true);
		}

		if (typeof el.animate !== "function") {
			el.style.opacity = hasItems ? "1" : "0";
			setOccupying(hasItems);
			return;
		}

		fadeRef.current?.cancel();
		const anim = el.animate(
			hasItems ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 1 }, { opacity: 0 }],
			{ duration: FADE_MS, easing: "ease", fill: "forwards" }
		);
		fadeRef.current = anim;
		if (!hasItems) {
			anim.onfinish = () => setOccupying(false);
		}
	}, [hasItems]);

	const expanded = onBoard || occupying;

	return (
		<div
			ref={bannerRef}
			className={classNames(styles.banner, { [styles.collapsed]: !expanded })}
			role="status"
			aria-live="polite"
		>
			{announcements.map((announcement) => (
				<span className={styles.item} key={announcement.id}>
					<span className={styles.player}>
						{nameById.get(announcement.playerId) ?? "Unknown"}:
					</span>
					<AnnouncementBody announcement={announcement} classes={styles} />
				</span>
			))}
		</div>
	);
}
