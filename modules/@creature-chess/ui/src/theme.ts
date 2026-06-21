export type Theme = {
	typography: {
		primary: string;
		accent: string;
	};
	palette: {
		primary: {
			neutral: string;
			light: string;
			dark: string;
		};
		secondary: {
			neutral: string;
			light: string;
			dark: string;
		};
		accent: {
			neutral: string;
			light: string;
			dark: string;
		};
		success: {
			neutral: string;
			light: string;
			dark: string;
		};
		dark: {
			neutral: string;
		};
		light: {
			neutral: string;
		};
		/** Muted foreground for secondary text and inactive controls. */
		muted: string;
		/** Raised dark surface for cards, panels, and the nav bar. */
		surface: string;
		background: string;
	};
};

export const DEFAULT_THEME: Theme = {
	typography: {
		primary: "'Jersey 25', sans-serif",
		accent: "'Caveat Brush', cursive",
	},
	palette: {
		primary: {
			neutral: "#691732",
			light: "#ec465e",
			dark: "#311a3c",
		},
		secondary: {
			neutral: "#1f4158",
			light: "#31596b",
			dark: "#122b41",
		},
		accent: {
			neutral: "#f5d742",
			light: "#f5d742",
			dark: "#f5d742",
		},
		success: {
			neutral: "#38b764",
			light: "#4fd17e",
			dark: "#2a8f4c",
		},
		dark: {
			neutral: "#1d1d1d",
		},
		light: {
			neutral: "#f5f5f5",
		},
		muted: "#9aa6a1",
		surface: "#13211c",
		background: "#424e70",
	},
};
