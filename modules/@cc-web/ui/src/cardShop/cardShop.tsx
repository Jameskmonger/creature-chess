import * as React from "react";

import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUseStyles } from "react-jss";

import { Card as CardModel } from "@creature-chess/models";

import { useGamemodeSettings } from "../../GamemodeSettingsContext";
import { DynamicAspectRatioComponent } from "../../gameBoard/DynamicAspectRatioComponent";
import { Layout } from "../../layout";
import { Button } from "../button";
import { CardSelector } from "./cardSelector";

type Props = {
	cards: (CardModel | null)[];
	ownedDefinitionIds: number[];
	money: number;
	isLocked?: boolean;
	onReroll?: () => void;
	onToggleLock?: () => void;
	onBuy?: (index: number) => void;
};

const useStyles = createUseStyles({
	container: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	aspectWrapper: {
		display: "flex",
		flexDirection: "column",
	},
	purchase: {
		background: "#38b764",
		padding: "0 1.5em",
		marginTop: "-2.5em",
		zIndex: 30,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		borderRadius: "4px",
		fontWeight: 700,
		cursor: "pointer",
		fontFamily: "Arial, sans-serif",
	},
	controls: {
		padding: 0,
		marginTop: "0.25em",
		userSelect: "none",
	},
});

const CardShop: React.FunctionComponent<Props> = ({
	cards,
	ownedDefinitionIds,
	money,
	isLocked = false,
	onReroll,
	onToggleLock,
	onBuy,
}) => {
	const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

	const onBuyCurrentCard = () =>
		onBuy && selectedIndex !== null && onBuy(selectedIndex);

	const { rerollCost } = useGamemodeSettings();

	const ref = React.useRef<HTMLDivElement>(null);
	const ASPECT_RATIO = 1 / 1;

	return (
		<Layout className={classes.container} direction="column" ref={ref}>
			<DynamicAspectRatioComponent
				aspectRatio={ASPECT_RATIO}
				containerRef={ref}
				className={classes.aspectWrapper}
			>
				<CardSelector
					cards={cards}
					money={money}
					onSelectCard={setSelectedIndex}
					ownedDefinitionIds={ownedDefinitionIds}
				/>

				<Layout
					className={classes.controls}
					direction="row"
					justifyContent="space-between"
				>
					<Button
						type="primary"
						onClick={onReroll}
						disabled={money < rerollCost}
					>
						<FontAwesomeIcon icon={faArrowsRotate} />
						&nbsp;${rerollCost}
					</Button>

					<div className={classes.purchase} onClick={onBuyCurrentCard}>
						<span>Purchase</span>
					</div>

					<Button type="primary" onClick={onToggleLock}>
						{isLocked ? "Unlock" : "Lock"}
					</Button>
				</Layout>
			</DynamicAspectRatioComponent>
		</Layout>
	);
};

export { CardShop };
