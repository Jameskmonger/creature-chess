import React from "react";
import { createUseStyles } from "react-jss";
import { PageBoardBackground } from "./PageBackground";
import { CreatureImage } from "./ui/creatureImage";
import { createUseThemeStyles } from "~/useStyles";
import { Logo } from "./Logo";
import classNames from "classnames";
import { LoadingBar } from "./LoadingBar";
import { TagLine } from "./TagLine";

const useStyles = createUseThemeStyles(theme => ({
	root: {
		position: "relative",
		overflow: "hidden",
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		boxSizing: "border-box",
	},
	top: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "end",
		flex: "0 0 auto",
		height: "initial",
		transition: "height 0.3s ease-in-out",
		gap: "16px",
	},
	topExpanded: {
		height: "60%",
	},
	bottom: {
		flex: "1 1 auto",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		boxSizing: "border-box",
		width: "100%",
		padding: "16px",
	},
	pane: {
		height: "100%",
		width: "calc(100% - 32px)",
		background: "#333c57",
		boxSizing: "border-box",
		padding: "4px",
	},
	paneInner: {
		height: "100%",
		width: "100%",
		border: "2px solid #424e70",
		boxSizing: "border-box",
		padding: "8px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "16px",
		color: "#fff",
		fontSize: "16px",
	},
}));

/**
 * https://stackoverflow.com/a/54114180
 */
function useDelayUnmount(initial: boolean, delayTime: number) {
	const [isMounted, setIsMounted] = React.useState(initial);
	const [shouldRender, setShouldRender] = React.useState(false);

	React.useEffect(() => {
		let timeoutId: number | NodeJS.Timeout;
		if (isMounted && !shouldRender) {
			setShouldRender(true);
		} else if (!isMounted && shouldRender) {
			timeoutId = setTimeout(
				() => setShouldRender(false),
				delayTime
			);
		}
		return () => clearTimeout(timeoutId);
	}, [isMounted, delayTime, shouldRender]);

	return {
		setIsMounted,
		isMounted,
		shouldRender,
	};
}

export function MenuPage() {
	const classes = useStyles();

	const tagline = useDelayUnmount(true, 300);
	const loadingBar = useDelayUnmount(true, 300);

	React.useEffect(() => {
		setTimeout(() => {
			tagline.setIsMounted(false);
			loadingBar.setIsMounted(false);
		}, 1000);
	}, [tagline, loadingBar]);

	return (
		<div className={classes.root}>
			<PageBoardBackground />
			<div className={classNames(
				classes.top, classes.topExpanded
			)}>
				<Logo />
				{<TagLine />}
				{<LoadingBar />}
			</div>
			{
				false && (
					<div className={classes.bottom}>
						<div className={classes.pane}>
							<div className={classes.paneInner}>
								<span>foo</span>
							</div>
						</div>
					</div>
				)
			}
		</div>
	);
}
