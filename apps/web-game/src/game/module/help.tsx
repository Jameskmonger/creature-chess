import * as React from "react";

import { createUseStyles } from "react-jss";

import { CreatureType } from "@creature-chess/models";
import { Footer, Group, Layout, TypeIndicator } from "@creature-chess/ui";
import { Header2, Header4 } from "@creature-chess/ui/text";

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
	},
	help: {
		color: "#fff",
		fontFamily: "Arial, sans-serif",
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
				<p>
					Buy pieces and place them on the board. Your board then battles
					another random player's board.
				</p>
				<br />
				<p>
					If you lose, your health will decrease. If your health hits 0, you
					will be knocked out.
				</p>
				<br />
				<p>The winner is the last player remaining!</p>
			</Group>
			<Group>
				<Header2>Creatures</Header2>
				<p>
					Three creatures (level 1) will combine to make a stronger creature
					(level 2). Three level 2 creatures can then evolve into a level 3
					creature.
				</p>
				<br />
				<p>
					Each creature has a class and a type. Their class determines their
					fighting style, and types give some boost/reduction to damage when
					fighting other types.
				</p>
				<br />
				<Header4>Classes</Header4>
				<ul className={styles.list}>
					<li>Valiant: All-round melee.</li>
					<li>Cunning: High damage, low-health melee.</li>
					<li>Arcane: Ranged.</li>
				</ul>
				<Header4>Types</Header4>
				<ul className={styles.list}>
					<li>
						<div className={styles.pieceType}>
							<TypeIndicator type={CreatureType.Earth} />
						</div>
						Earth: Overcomes water.
					</li>
					<li>
						<div className={styles.pieceType}>
							<TypeIndicator type={CreatureType.Metal} />
						</div>
						Metal: Overcomes wood.
					</li>
					<li>
						<div className={styles.pieceType}>
							<TypeIndicator type={CreatureType.Water} />
						</div>
						Water: Overcomes fire.
					</li>
					<li>
						<div className={styles.pieceType}>
							<TypeIndicator type={CreatureType.Wood} />
						</div>
						Wood: Overcomes earth.
					</li>
					<li>
						<div className={styles.pieceType}>
							<TypeIndicator type={CreatureType.Fire} />
						</div>
						Fire: Overcomes metal.
					</li>
				</ul>
			</Group>
			<Group>
				<Header2>Money</Header2>
				<p>After each round you will receive some money:</p>
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
