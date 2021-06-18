import * as React from "react";
import { CreatureType } from "@creature-chess/models";
import { TypeIndicator } from "@creature-chess/ui";
import { Footer } from "../../display/footer";

const Help: React.FunctionComponent<{ hideFooter?: boolean }> = ({ hideFooter = false }) => (
	<div className="help">
		<div className="section">
			<h2 className="header">The Game</h2>
			<p>
				Buy pieces and place them on the board.
				Your board then battles another random player's board.
				If you lose, your health will decrease. If your health hits 0, you will be
				knocked out.
			</p>
			<p>The winner is the last player remaining!</p>
		</div>
		<div className="section">
			<h2 className="header">Creatures</h2>
			<p>Three creatures (level 1) will combine to make a stronger creature (level 2).
				Three level 2 creatures can then evolve into a level 3 creature.</p>
			<p>Each creature has a class and a type. Their class determines their fighting style,
				and types give some boost/reduction to damage when fighting other types.</p>
			<h3 className="subheader">Classes</h3>
			<ul>
				<li><span className="list-header">Valiant:</span> All-round melee.</li>
				<li><span className="list-header">Cunning:</span> High damage, low-health melee.</li>
				<li><span className="list-header">Arcane:</span> Ranged.</li>
			</ul>
			<h3 className="subheader">Types</h3>
			<ul>
				<li><span className="list-header">
					<div className="piece-type"><TypeIndicator type={CreatureType.Earth} /></div>
					Earth:</span> Overcomes water.</li>
				<li><span className="list-header">
					<div className="piece-type"><TypeIndicator type={CreatureType.Metal} /></div>
					Metal:</span> Overcomes wood.</li>
				<li><span className="list-header">
					<div className="piece-type"><TypeIndicator type={CreatureType.Water} /></div>
					Water:</span> Overcomes fire.</li>
				<li><span className="list-header">
					<div className="piece-type"><TypeIndicator type={CreatureType.Wood} /></div>
					Wood:</span> Overcomes earth.</li>
				<li><span className="list-header">
					<div className="piece-type"><TypeIndicator type={CreatureType.Fire} /></div>
					Fire:</span> Overcomes metal.</li>
			</ul>
		</div>
		<div className="section">
			<h2 className="header">Money</h2>
			<p>After each round you will receive some money:</p>
			<ul>
				<li>Bonus for winning the round</li>
				<li>10% interest</li>
				<li>Win / loss streak bonus</li>
			</ul>
		</div>

		{!hideFooter && <Footer />}
	</div>
);

export { Help };
