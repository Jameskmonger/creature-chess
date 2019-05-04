import * as React from "react";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { GameStage } from "./stages/gameStage";
import { AppState } from "../store/store";
import { LobbyStage } from "./stages/lobbyStage";
import { localPlayerIdSelector } from "../selectors/gameSelector";

interface Props {
    inLobby: boolean;
}

interface State {
    width: number;
    height: number;
}

class GameUnconnected extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    public render() {
        const { inLobby } = this.props;
        const { width, height } = this.state;

        return (
            <>
                {
                    inLobby
                        ? <LobbyStage />
                        : <GameStage width={width} height={height} />
                }
            </>
        );
    }

    public componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    private updateDimensions() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }
}

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    inLobby: localPlayerIdSelector(state) === null
});

const Game = connect(mapStateToProps)(GameUnconnected);

export {
    Game
};
