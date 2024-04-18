import React from "react";

import { createUseStyles } from "react-jss";

type TabMenuProps = {
	tabs: {
		label: string;
		content: React.ReactNode;
	}[];
};

const useStyles = createUseStyles({
	tabMenu: {},

	tabs: {
		listStyle: "none",
		padding: 0,
		margin: 0,
		display: "flex",
		justifyContent: "space-around",
		backgroundColor: "#303030",
	},
	tab: {
		"flex": 1,
		"padding": "10px 20px",
		"cursor": "pointer",
		"borderBottom": "2px solid transparent",

		"fontFamily": '"Roboto", "sans-serif"',
		"fontOpticalSizing": "auto",
		"fontWeight": 700,
		"fontStyle": "normal",
		"fontSize": "18px",
		"color": "#e8e8e8",

		"&.active": {
			background: "#797979",
			fontWeight: "bold",
			color: "#242424",
		},
	},
	content: {
		padding: "0.5em",
	},
});

export function TabMenu({ tabs }: TabMenuProps) {
	const classes = useStyles();

	const [activeTab, setActiveTab] = React.useState(0);

	const handleTabClick = (index: number) => {
		setActiveTab(index);
	};

	return (
		<div className={classes.tabMenu}>
			<ul className={classes.tabs}>
				{tabs.map((tab, index) => (
					<li
						key={index}
						className={`${classes.tab} ${activeTab === index ? "active" : ""}`}
						onClick={() => handleTabClick(index)}
					>
						{tab.label}
					</li>
				))}
			</ul>
			<div className={classes.content}>{tabs[activeTab].content}</div>
		</div>
	);
}
