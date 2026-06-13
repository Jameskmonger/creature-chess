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
		dark: {
			neutral: string;
		};
		light: {
			neutral: string;
		};
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
		dark: {
			neutral: "#1d1d1d",
		},
		light: {
			neutral: "#f5f5f5",
		},
		background: "#424e70",
	},
};
