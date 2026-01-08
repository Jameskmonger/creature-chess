import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { createUseThemeStyles, DEFAULT_THEME, Theme } from "./useStyles";

const meta: Meta = {
	title: "Design System/Theme",
};

export default meta;

type Story = StoryObj;

const useStyles = createUseThemeStyles(theme => ({
	container: {
		padding: "24px",
		maxWidth: "1200px",
		margin: "0 auto",
		fontFamily: "system-ui, -apple-system, sans-serif",
		display: "flex",
		flexDirection: "column",
		gap: "16px",
	},
	title: {
		fontSize: "32px",
		fontWeight: "bold",
		margin: 0,
	},
	subtitle: {
		fontSize: "18px",
		fontWeight: "bold",
	},
	colorGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
		gap: "16px",
	},
	swatch: {
		display: "flex",
		flexDirection: "column",
		gap: "8px",
		padding: "16px",
		border: "1px solid #e0e0e0",
		borderRadius: "8px",
		backgroundColor: "#fff",
	},
	swatchColor: {
		height: "100px",
		borderRadius: "4px",
		border: "1px solid rgba(0,0,0,0.1)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "#333",
		fontWeight: "bold",
		fontSize: "14px",
	},
	swatchName: {
		fontFamily: "monospace",
		fontSize: "12px",
		fontWeight: "bold",
	},
	swatchGroup: {
		display: "flex",
		flexDirection: "column",
		gap: "16px",
	},
	typographyLabel: {
		fontSize: "12px",
		color: "#666",
	},
	typographyExample: {
		fontSize: "28px",
	},
}));

function ColorSwatch({ name, value }: { name: string; value: string }) {
	const classes = useStyles();

	return (
		<div className={classes.swatch}>
			<div
				className={classes.swatchColor}
				style={{
					backgroundColor: value,
				}}
			/>
			<div>
				<div className={classes.swatchName}>
					{name}
				</div>
			</div>
		</div>
	);
};

function PaletteGroup({ group }: { group: keyof Theme["palette"] }) {
	const classes = useStyles();

	const colors = Object.entries(DEFAULT_THEME.palette[group]).map(([name, value]) => ({
		name: `${group}.${name}`,
		value,
	}));

	return (
		<div className={classes.colorGrid}>
			{colors.map((color) => (
				<ColorSwatch key={color.name} {...color} />
			))}
		</div>
	);
}

function FontSample({ fontFamily }: { fontFamily: keyof Theme["typography"] }) {
	const classes = useStyles();
	const fontValue = DEFAULT_THEME.typography[fontFamily];

	return (
		<div>
			<div className={classes.typographyExample} style={{ fontFamily: fontValue }}>
				The quick brown fox jumps over the lazy dog.
			</div>
			<div className={classes.typographyLabel}>
				typography.{fontFamily}
			</div>
		</div>
	);
}

const ColorPaletteDemo: React.FC = () => {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<h1 className={classes.title}>
				Theme
			</h1>

			<div>
				<h3 className={classes.subtitle}>Palette</h3>

				<div className={classes.swatchGroup}>
					<PaletteGroup group="primary" />
					<PaletteGroup group="secondary" />
					<PaletteGroup group="accent" />
					<PaletteGroup group="dark" />
					<ColorSwatch name="background" value={DEFAULT_THEME.palette.background} />
				</div>
			</div>

			<div>
				<h3 className={classes.subtitle}>Typography</h3>
				<div className={classes.swatchGroup}>
					<FontSample fontFamily="primary" />
					<FontSample fontFamily="accent" />
				</div>
			</div>
		</div >
	);
};

export const ThemeDemo: Story = {
	render: () => <ColorPaletteDemo />,
};
