import { createUseStyles } from "react-jss";

export const useDyingStyles = createUseStyles({
	"@keyframes piece-dying-anim": {
		"100%": {
			transform: "scale(0)",
		},
	},
	"dying": {
		animationName: "$piece-dying-anim",
		animationDuration: "1000ms",
		animationFillMode: "forwards",
		animationIterationCount: "1",
	},
});
