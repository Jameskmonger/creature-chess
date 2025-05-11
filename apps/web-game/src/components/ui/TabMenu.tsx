import React from "react";

import { createUseStyles } from "react-jss";

type TabMenuProps = {
	tabs: {
		label: string;
		content: React.ReactNode;
	}[];
	className?: string;
};

const useStyles = createUseStyles({
	tabMenu: {
		display: "flex",
		flexDirection: "column",
		minHeight: 0,
	},
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
		"padding": "6px 12px",
		"cursor": "pointer",
		"borderBottom": "2px solid transparent",

		"fontFamily": '"Roboto", "sans-serif"',
		"fontOpticalSizing": "auto",
		"fontWeight": 700,
		"fontStyle": "normal",
		"fontSize": "14px",
		"color": "#e8e8e8",

		"@media (min-width: 400px)": {
			padding: "10px 20px",
			fontSize: "18px",
		},

		"&.active": {
			background: "#797979",
			fontWeight: "bold",
			color: "#242424",
		},
	},
	content: {
		flex: 1,
		minHeight: 0,
		overflowY: "auto",
		padding: "0.5em",
	},
});

export function TabMenu({ tabs, className }: TabMenuProps) {
	const classes = useStyles();

	const [activeTab, setActiveTab] = React.useState(0);

	const handleTabClick = (index: number) => {
		setActiveTab(index);
	};

	return (
		<div className={`${classes.tabMenu} ${className}`}>
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
