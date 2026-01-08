import * as React from "react";
import { createUseThemeStyles } from "~/useStyles";
import { TagLine } from "../TagLine";
import { PageBoardBackground } from "../PageBackground";
import { MenuCard } from "./MenuCard";
import { NavBar } from "../ui/navbar/NavBar";
import { faPlay, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui";
import { CreatureImage } from "../ui/creatureImage";
import { Help } from "../game/help";
import { useDispatch } from "react-redux";
import { openConnection } from "~/networking";

const useStyles = createUseThemeStyles(theme => ({
	root: {
		width: "100%",
		height: "100%",
		boxSizing: "border-box",
		display: "flex",
		flexDirection: "column",
	},
	brandBar: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		background: theme.palette.background,
		borderBottom: "2px solid hsl(224 26% 24% / 1)",
		padding: "0.25rem 1rem",

		"& img": {
			"height": "5rem",
			filter: "drop-shadow(0px 2px 2px #222)"
		}
	},
	content: {
		padding: "0.5rem",
		flex: 1,
		position: "relative",
		display: "flex",
		flexDirection: "column",
		overflow: "hidden",
		gap: "0.5rem",
	},
	social: {
		display: "flex",
		flexDirection: "row",
		gap: "0.5rem",

		"& > :first-child": {
			flex: 1,
		},
	},
	profile: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: "0.5rem",
		fontSize: "1.5rem",
		color: theme.palette.light.neutral,

		"& img": {
			width: "32px",
			height: "32px",
		},
	},
	friends: {
		width: "32px",
		height: "32px",
		"filter": "saturate(0)",
	},
	main: {
		flex: 1,
		overflow: "auto",
	},
	home: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		gap: "0.5rem",
	},
	homeCard: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
	},
	creatures: {
		"display": "flex",
		"justifyContent": "center",
		"gap": "8px",
		"& img": {
			"height": "48px",
			"width": "48px",
		},
	},
	welcome: {
		fontSize: "24px",
		textAlign: "center",
		color: theme.palette.light.neutral,
	},
	highlight: {
		color: "#f5d742",
		fontFamily: theme.typography.accent,
	},
}));

export function GameMenu() {
	const classes = useStyles();
	const dispatch = useDispatch();

	const onFindGameClick = React.useCallback(
		() => dispatch(openConnection()),
		[dispatch]
	);

	const [view, setView] = React.useState<"help" | "home">("home");

	// todo
	const showSocial = false;

	return (
		<div className={classes.root}>
			<div className={classes.brandBar}>
				<img src={`${APP_IMAGE_ROOT}/ui/logo.png`} alt="Creature Chess Logo" />
				<TagLine />
			</div>
			<div className={classes.content}>
				<PageBoardBackground />
				{
					showSocial && (
						<div className={classes.social}>
							<MenuCard>
								<div className={classes.profile}>
									<img src={`${APP_IMAGE_ROOT}/ui/guest.png`} alt="Guest Profile Icon" />
									<span>Playing as Guest</span>
								</div>
							</MenuCard>
							<MenuCard>
								<img className={classes.friends} src={`${APP_IMAGE_ROOT}/ui/friends.png`} alt="Friends Profile Icon" />
							</MenuCard>
						</div>
					)
				}
				<div className={classes.main}>
					{
						view === "home"
						&& <div className={classes.home}>
							<MenuCard className={classes.homeCard}>
								<p className={classes.welcome}>Welcome to <span className={classes.highlight}>Creature Chess</span>!</p>
								<div className={classes.creatures}>
									<CreatureImage definitionId={33} facing="front" />
									<CreatureImage definitionId={44} facing="front" />
									<CreatureImage definitionId={47} facing="front" />
									<CreatureImage definitionId={27} facing="front" />
									<CreatureImage definitionId={39} facing="front" />
								</div>
								<Button color="primary" size="large" onClick={onFindGameClick}>Start Game</Button>
							</MenuCard>
						</div>
					}
					{view === "help" && <MenuCard><Help /></MenuCard>}
				</div>
			</div>
			<div>
				<NavBar
					items={[
						{
							key: "help",
							icon: faQuestionCircle,
						},
						{
							key: "home",
							icon: faPlay,
						},
					] as const}
					active={view}
					onSelect={setView}
				/>
			</div>
		</div>
	);
}
