import * as React from "react";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { GameStage } from "./gameStage";
import { AppState } from "../store/state";
import { MenuStage } from "./menuStage";
import { localPlayerIdSelector } from "../store/gameSelector";

interface Props {
    inMenu: boolean;
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
        const { inMenu } = this.props;
        const { width, height } = this.state;

        return (
            <>
                {
                    inMenu
                        ? <MenuStage />
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
    inMenu: localPlayerIdSelector(state) === null
});

const Game = connect(mapStateToProps)(GameUnconnected);

export {
    Game
};
