import * as React from "react";
import { MapStateToProps, connect } from "react-redux";
import { GameStage } from "./gameStage";
import { AppState } from "../store/state";
import { MenuStage } from "./menuStage";

enum GameState {
    MENU = 0,
    LOBBY = 1,
    GAME = 2
}

interface Props {
    gameState: GameState;
}

interface State {
    width: number;
    height: number;
}

class GameUnconnected extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    public render() {
        const { gameState } = this.props;

        if (gameState === GameState.GAME) {
            const { width, height } = this.state;

            return <GameStage width={width} height={height} />;
        }

        if (gameState === GameState.LOBBY) {            
            return <></>;
        }

        return <MenuStage />;
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

const gameStateSelector = (state: AppState) => {
    if (state.localPlayer.id !== null) {
        return GameState.GAME;
    }

    if (state.lobby.lobbyId !== null) {
        return GameState.LOBBY;
    }

    return GameState.MENU;
};

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    gameState: gameStateSelector(state)
});

const Game = connect(mapStateToProps)(GameUnconnected);

export {
    Game
};
