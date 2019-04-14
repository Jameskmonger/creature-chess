import * as React from "react";
import { compose } from "recompose";
import delay from "delay";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { PokemonCard, PlayerListPlayer } from "@common";
import { PokemonPiece, makeFriendly } from "@common/pokemon-piece";
import { Board } from "../board";
import { simulateTurn } from "@common/fighting-turn-simulator";
import { Bench } from "../bench/bench";
import { CardSelector } from "../cardSelector";
import { AppState } from "../../store/store";
import { SelectedPieceInfoPanel } from "../selectedPieceInfo/selectedPieceInfoPanel";
import { piecesUpdated } from "../../actions/pieceActions";
import { PlayerList } from "../playerList/playerList";
import { playerListUpdated } from "../../actions/playerListActions";

const isATeamDefeated = (pieces: PokemonPiece[]) => {
    return !(pieces.some(p => p.friendly && p.currentHealth > 0) && pieces.some(p => !p.friendly && p.currentHealth > 0));
};

const boardSize = 8;

interface StateProps {
    pieces: PokemonPiece[];
}

interface GameStageDispatchProps {
    onPiecesUpdated: (pieces: PokemonPiece[]) => void;
    onPlayerListUpdated: (players: PlayerListPlayer[]) => void;
}

type Props = StateProps & GameStageDispatchProps;

interface GameStageState {
    benchPieces: PokemonPiece[];
    cards: PokemonCard[];
}

class GameStageUnconnected extends React.Component<Props, GameStageState> {
    public state: GameStageState = {
        benchPieces: [],
        cards: []
    };

    private socket = io("http://localhost:3000");

    public componentDidMount() {
        const benchPieces: PokemonPiece[] = [
            makeFriendly(9, [8, 2]),
            makeFriendly(70, [8, 5]),
            makeFriendly(67, [8, 6])
        ];

        this.setState({ benchPieces });

        this.socket.on("cardsUpdate", (cards: PokemonCard[]) => {
            this.setState({ cards });
        });

        this.socket.on("boardUpdate", (packet: { friendly: PokemonPiece[], opponent: PokemonPiece[] }) => {
            const pieces = [...packet.friendly, ...packet.opponent];
            this.props.onPiecesUpdated(pieces);
        });

        this.socket.on("playerListUpdate", (players: PlayerListPlayer[]) => {
            this.props.onPlayerListUpdated(players);
        });
    }

    public render() {
        const { benchPieces, cards } = this.state;

        const boardContainerStyle = {
            height: window.innerHeight + "px",
            width: ((window.innerHeight / 9) * 8) + "px"
        };

        return (
            <div className="game">
                <div className="column">
                    <PlayerList />

                    <CardSelector cards={cards} onShuffle={this.onShuffle} />
                </div>
                <div className="board-container" style={boardContainerStyle}>
                    <div className="chessboard">
                        <Board boardSize={boardSize} />
                        <Bench boardSize={boardSize} pieces={benchPieces} />
                    </div>
                </div>
                <div className="column">
                    <button onClick={(this.startRound)}>Fight!</button>
                    <SelectedPieceInfoPanel />
                </div>
            </div>
        );
    }

    private onShuffle = () => {
        this.socket.emit("refreshCards");
    }

    private startRound = async () => {
        const turnDurationMs = 50;
        let pieces = this.props.pieces;
        while (!isATeamDefeated(pieces)) {
            await delay(turnDurationMs);
            pieces = simulateTurn(pieces);
            this.props.onPiecesUpdated(pieces);
        }

        this.props.onPiecesUpdated(pieces.map(piece => ({ ...piece, celebrating: true })));
    }
}

export const joinGame = () => {
    const socket = io("http://localhost:3000");
    socket.emit("joinGame", "Player", (joined: boolean) => {
        // do stuff
    });
};

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = state => ({
    pieces: state.pieces
});

const mapDispatchToProps: MapDispatchToProps<GameStageDispatchProps, {}> = dispatch => ({
    onPiecesUpdated: (pieces: PokemonPiece[]) => dispatch(piecesUpdated(pieces)),
    onPlayerListUpdated: (players: PlayerListPlayer[]) => dispatch(playerListUpdated(players))
});

const GameStage = compose(
    connect(mapStateToProps, mapDispatchToProps),
    DragDropContext(HTML5Backend)
)(GameStageUnconnected);

export {
    GameStage
};
