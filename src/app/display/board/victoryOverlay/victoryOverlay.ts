import { connect, MapStateToProps } from "react-redux";

import { VictoryOverlayUnconnected, VictoryOverlayProps } from "./victoryOverlayUnconnected";
import { AppState } from "@app/store";

const mapStateToProps: MapStateToProps<VictoryOverlayProps, {}, AppState> = (state, ownProps) => {
    return {
        winnerName: state.game.winnerName
    };
};

export const VictoryOverlay = connect(mapStateToProps)(VictoryOverlayUnconnected);
