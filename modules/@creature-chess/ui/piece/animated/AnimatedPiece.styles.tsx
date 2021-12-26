import { createUseStyles } from "react-jss";

export const useAnimationStyles = createUseStyles({
	"@keyframes dying": {
		"100%": {
			transform: "scale(0)"
		}
	},
	"dying": {
		animationName: "$dying",
		animationDuration: "1000ms",
		animationFillMode: "forwards",
		animationIterationCount: "1"
	}
});

export const usePieceStyles = createUseStyles({
	piece: {
		position: "relative",
		zIndex: 50,
		width: "100%",
		height: "100%",
	}
});
