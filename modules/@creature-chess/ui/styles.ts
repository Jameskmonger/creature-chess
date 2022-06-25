import { createUseStyles } from "react-jss";

const useResetStyles = createUseStyles({
	"@global": {
		["html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p," +
		"blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em," +
		"img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i," +
		"center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption," +
		"tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure," +
		"figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary," +
		"time, mark, audio, video"]: {
			padding: "0",
			margin: "0",
			font: "inherit",
			fontSize: "100%",
			verticalAlign: "baseline",
			border: "0",
		},
		"article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section":
			{
				display: "block",
			},
		body: {
			lineHeight: "1",
		},
		"ol, ul": {
			listStyle: "none",
		},
		"blockquote, q": {
			quotes: "none",
		},
		"blockquote::before, blockquote::after, q::before, q::after": {
			content: "none",
		},
		table: {
			borderSpacing: "0",
			borderCollapse: "collapse",
		},
	},
});

const useGlobalGameStyles = createUseStyles({
	"@global": {
		"*": {
			userSelect: "none",
		},
		".approot": {
			position: "fixed",
			width: "100%",
			height: "100%",
		},
		body: {
			background: "#333c57",
		},
	},
});

export const useGlobalStyles = () => {
	useResetStyles();
	useGlobalGameStyles();
};
