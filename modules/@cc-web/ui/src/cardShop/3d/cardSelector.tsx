import * as React from "react";

import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { Card as CardModel } from "@creature-chess/models";

import { IMAGE_BASE_URL } from "@cc-web/shared/constants";

import { Card } from "./card";

type Props = {
	cards: (CardModel | null)[];
	ownedDefinitionIds: number[];
	money: number;
	onSelectCard?: (index: number | null) => void;
};

const useStyles = createUseStyles<string, { rotations: number[] }>({
	container: {
		position: "relative",
		overflow: "hidden",
		border: "4px solid #303030",
		backgroundImage: `url(${IMAGE_BASE_URL}/ui/textures/velvet.jpg)`,
		flex: 1,
	},
	cardStack: {
		position: "relative",
		height: "100%",
		width: "100%",
		top: "5%",
	},
	selected: {
		marginTop: "-1em",
	},
	cardStackCard: {
		"position": "absolute",
		"borderRadius": "10px",
		"boxShadow": "2px 7px 9px 2px rgb(0 0 0 / 90%)",
		"width": "70%",
		/**
		 * todo: this doesn't seem to work
		 */
		"transition": "all 0.5s",

		/**
		 * todo: would be nice if these rotations had a bit of randomness
		 */
		"&:nth-child(1)": {
			top: "5%",
			left: "15%",
			zIndex: 25,
			transform: ({ rotations }) => `rotate(${rotations[0]}deg)`,
			filter: "brightness(1.0)",
		},
		"&:nth-child(2)": {
			top: "15%",
			left: "30%",
			zIndex: 24,
			transform: ({ rotations }) => `rotate(${rotations[1]}deg)`,
			filter: "brightness(0.6)",
		},
		"&:nth-child(3)": {
			top: "20%",
			left: "35%",
			zIndex: 23,
			transform: ({ rotations }) => `rotate(${rotations[2]}deg)`,
			filter: "brightness(0.5)",
		},
		"&:nth-child(4)": {
			top: "25%",
			left: "40%",
			zIndex: 22,
			transform: ({ rotations }) => `rotate(${rotations[3]}deg)`,
			filter: "brightness(0.4)",
		},
		"&:nth-child(5)": {
			top: "30%",
			left: "45%",
			zIndex: 21,
			transform: ({ rotations }) => `rotate(${rotations[4]}deg)`,
			filter: "brightness(0.3)",
		},
	},
	controls: {
		position: "absolute",
		height: "100%",
		top: 0,
		width: "30%",
		zIndex: 30,
		background: "rgb(0,212,255)",
		cursor: "pointer",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		color: "rgba(255, 255, 255, 0.8)",
		fontSize: "1.5em",
	},
	controlLeft: {
		left: 0,
		alignItems: "start",
		paddingLeft: "0.5em",
		background:
			"linear-gradient(90deg, rgba(0,212,255,0.25) 0%, rgba(0,212,255,0.1) 35%, rgba(0,212,255,0) 58%, rgba(0,212,255,0) 100%)",
	},
	controlRight: {
		right: 0,
		alignItems: "end",
		paddingRight: "0.5em",
		background:
			"linear-gradient(270deg, rgba(0,212,255,0.25) 0%, rgba(0,212,255,0.1) 35%, rgba(0,212,255,0) 58%, rgba(0,212,255,0) 100%)",
	},

	paginator: {
		position: "absolute",
		top: "0.25em",
		width: "100%",
		display: "flex",
		justifyContent: "center",
	},
	paginatorChip: {
		background: "#303030",
		borderRadius: "10px",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		height: "1em",
	},
	paginatorDot: {
		width: "0.75em",
		height: "0.75em",
		background: "rgba(255, 255, 255, 0.5)",
		borderRadius: "50%",
		margin: "0 0.25em",

		transition: "background 0.6s, width 0.6s, height 0.6s",
	},
	paginatorDotActive: {
		background: "rgba(255, 255, 255, 1)",
		width: "1em",
		height: "1em",
	},
});

function useCardScroll(cards: Props["cards"]) {
	const [activeIndex, setActiveCardIndex] = React.useState<number>(0);

	const goNext = React.useCallback(() => {
		setActiveCardIndex((prev) => {
			let cur = null;

			while (cur === null) {
				prev = prev + 1;

				if (prev >= cards.length) {
					prev = 0;
				}

				cur = cards[prev];
			}

			return prev;
		});
	}, [cards]);

	const goPrevious = React.useCallback(() => {
		setActiveCardIndex((prev) => {
			let cur = null;

			while (cur === null) {
				prev = prev - 1;

				if (prev < 0) {
					prev = cards.length - 1;
				}

				cur = cards[prev];
			}

			return prev;
		});
	}, [cards]);

	// set back to first card when the cards change
	React.useEffect(() => {
		setActiveCardIndex(0);
	}, [cards]);

	// skip null cards
	React.useEffect(() => {
		if (cards[activeIndex] === null) {
			goNext();
		}
	}, [activeIndex, cards, goNext]);

	// set random rotations for the cards whenever the active card changes
	const [rotations, setRandomRotations] = React.useState<number[]>([]);
	React.useEffect(() => {
		const newRotations: number[] = Array.from({ length: cards.length });

		newRotations[0] = Math.random() * 6 - 3;

		for (let i = 1; i < cards.length; i++) {
			newRotations[i] = Math.random() * 20 - 10;
		}

		setRandomRotations(newRotations);
	}, [cards, activeIndex]);

	const card = cards[activeIndex] || null;

	const others = cards
		.slice(activeIndex + 1)
		.concat(cards.slice(0, activeIndex));

	return {
		card,
		cardIndex: activeIndex,
		rotations,
		others,
		goNext,
		goPrevious,
	};
}

/**
 * todo: consider locking this to square aspect ratio, so
 * we can be a bit more stylish with the card layout
 */
const CardSelector: React.FunctionComponent<Props> = ({
	cards,
	ownedDefinitionIds,
	money,
	onSelectCard,
}) => {
	const { card, cardIndex, others, rotations, goNext, goPrevious } =
		useCardScroll(cards);

	const classes = useStyles({ rotations });

	React.useEffect(() => {
		if (onSelectCard) {
			onSelectCard(cardIndex);
		}
	}, [cardIndex, onSelectCard]);

	const createCard = React.useCallback(
		(c: CardModel | null) => {
			if (c === null) {
				return null;
			}

			const isOwned = ownedDefinitionIds.includes(c.definitionId);

			return (
				<div className={classes.cardStackCard} key={c.id}>
					<Card alreadyOwned={isOwned} disabled={money < c.cost} card={c} />
				</div>
			);
		},
		[classes.cardStackCard, money, ownedDefinitionIds]
	);

	const cardStack: React.ReactNode[] = [];

	if (card) {
		cardStack.push(createCard(card));
	}

	others.forEach((c) => {
		cardStack.push(createCard(c));
	});

	return (
		<div className={classes.container}>
			<div className={classes.paginator}>
				<div className={classes.paginatorChip}>
					{Array.from({ length: cards.length }).map((_, i) =>
						cards[i] === null ? null : (
							<div
								key={i}
								className={classNames(classes.paginatorDot, {
									[classes.paginatorDotActive]: i === cardIndex,
								})}
							/>
						)
					)}
				</div>
			</div>
			<div
				className={classNames(classes.controls, classes.controlLeft)}
				onClick={goPrevious}
			>
				<FontAwesomeIcon icon={faArrowLeft} />
			</div>
			<div className={classes.cardStack}>{cardStack}</div>
			<div
				className={classNames(classes.controls, classes.controlRight)}
				onClick={goNext}
			>
				<FontAwesomeIcon icon={faArrowRight} />
			</div>
		</div>
	);
};

export { CardSelector };
