import * as React from "react";

import { createUseStyles } from "react-jss";

import { Footer } from "../ui/Footer";
import { TraitIcon } from "../ui/TraitIcon";
import { Group, Layout } from "../ui/layout";
import { Header2, Header4 } from "../ui/text";

const useStyles = createUseStyles({
	pieceType: {
		display: "inline-block",
		// todo consider use of px here
		width: "24px",
		height: "24px",
		marginRight: "0.5rem",
	},
	list: {
		"marginBottom": "1rem",
		"marginLeft": "1.5rem",
		"list-style-type": "disc",

		"& > li": {
			"fontSize": "12px",
			"marginBottom": "8px",

			"@media (min-width: 400px)": {
				fontSize: "16px",
				marginBottom: "12px",
			},
		},
	},
	help: {
		color: "#fff",
	},
	helpText: {
		"fontSize": "12px",
		"marginBottom": "8px",

		"@media (min-width: 400px)": {
			fontSize: "16px",
			marginBottom: "12px",
		},
	},
});

const Help: React.FunctionComponent<{ hideFooter?: boolean }> = ({
	hideFooter = false,
}) => {
	const styles = useStyles();

	return (
		<Layout direction="column" className={styles.help}>
			<Group>
				<Header2>The Game</Header2>
				<p className={styles.helpText}>
					Buy pieces and place them on the board. Your board then battles
					another random player's board.
				</p>
				<p className={styles.helpText}>
					If you lose, your health will decrease. If your health hits 0, you
					will be knocked out.
				</p>
				<p className={styles.helpText}>
					The winner is the last player remaining!
				</p>
			</Group>
			<Group>
				<Header2>Creatures</Header2>
				<p className={styles.helpText}>
					Three creatures (level 1) will combine to make a stronger creature
					(level 2). Three level 2 creatures can then evolve into a level 3
					creature.
				</p>
				<p className={styles.helpText}>
					Each creature has a class and a type. Their class determines their
					fighting style, and types give some boost/reduction to damage when
					fighting other types.
				</p>
				<Header4>Classes</Header4>
				<ul className={styles.list}>
					<li>
						<div className={styles.pieceType}>
							<TraitIcon trait="valiant" />
						</div>
						Valiant: All-round melee.
					</li>
					<li>
						<div className={styles.pieceType}>
							<TraitIcon trait="cunning" />
						</div>
						Cunning: High damage, low-health melee.
					</li>
					<li>
						<div className={styles.pieceType}>
							<TraitIcon trait="arcane" />
						</div>
						Arcane: Ranged.
					</li>
				</ul>
				<Header4>Types</Header4>
				<ul className={styles.list}>
					<li>
						<div className={styles.pieceType}>
							<TraitIcon trait="earth" />
						</div>
						Earth: Beats water.
					</li>
					<li>
						<div className={styles.pieceType}>
							<TraitIcon trait="metal" />
						</div>
						Metal: Beats wood.
					</li>
					<li>
						<div className={styles.pieceType}>
							<TraitIcon trait="water" />
						</div>
						Water: Beats fire.
					</li>
					<li>
						<div className={styles.pieceType}>
							<TraitIcon trait="wood" />
						</div>
						Wood: Beats earth.
					</li>
					<li>
						<div className={styles.pieceType}>
							<TraitIcon trait="fire" />
						</div>
						Fire: Beats metal.
					</li>
				</ul>
			</Group>
			<Group>
				<Header2>Money</Header2>
				<p className={styles.helpText}>
					After each round you will receive some money:
				</p>
				<ul className={styles.list}>
					<li>Bonus for winning the round</li>
					<li>10% interest</li>
					<li>Win / loss streak bonus</li>
				</ul>
			</Group>

			{!hideFooter && <Footer />}
		</Layout>
	);
};

export { Help };
