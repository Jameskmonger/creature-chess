import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faQuestionCircle, faShoppingCart, faUsers, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { getPlayerMoney } from "@creature-chess/shared";
import { AppState } from "../../store";
import { Overlay } from "../../ui/overlay";
import { closeOverlay, openOverlay } from "../../ui/actions";
import { BoardContainer } from "../features/board/boardContainer";
import { CardShop } from "../features/cardShop";
import { PlayerList } from "../features/playerList";
import { Profile } from "../features/profile";
import { Settings } from "../features/settings";
import { RoundIndicator } from "../features/roundIndicator";
import { PhaseInfo } from "../features/phaseInfo";
import { Help } from "../features/help";
import { NowPlaying } from "../features/nowPlaying";

const NavItem: React.FunctionComponent<{ overlay: Overlay, icon: IconDefinition }> = ({ overlay, icon }) => {
    const dispatch = useDispatch();
    const isActive = useSelector<AppState, boolean>(state => state.ui.currentOverlay === overlay);

    const onClick = () => {
        if (isActive) {
            dispatch(closeOverlay());
            return;
        }

        dispatch(openOverlay(overlay));
    };

    return (
        <button className={`navitem${isActive ? " active" : ""}`} onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
        </button>
    );
};

const Navbar: React.FunctionComponent = () => {
    return (
        <nav className="navbar">
            <NavItem overlay={Overlay.PLAYERS} icon={faUsers} />
            <NavItem overlay={Overlay.SHOP} icon={faShoppingCart} />
            <NavItem overlay={Overlay.HELP} icon={faQuestionCircle} />
            <NavItem overlay={Overlay.SETTINGS} icon={faCog} />
        </nav>
    );
};

const OverlayComponent: React.FunctionComponent<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    const dispatch = useDispatch();
    const dispatchCloseOverlay = () => dispatch(closeOverlay());

    return (
        <div className="game-overlay">
            <div className="overlay-header">
                <h2 className="overlay-title">{title}</h2>
                <button className="close" onClick={dispatchCloseOverlay}>X</button>
            </div>
            <div className="overlay-content">
                {children}
            </div>
        </div>
    );
};

const GameOverlay: React.FunctionComponent<{ currentOverlay: Overlay }> = ({ currentOverlay }) => {
    const currentBalance = useSelector<AppState, number>(getPlayerMoney);

    if (currentOverlay === Overlay.PLAYERS) {
        return (
            <OverlayComponent title="Players">
                <PlayerList />
            </OverlayComponent>
        );
    }

    if (currentOverlay === Overlay.SHOP) {
        return (
            <OverlayComponent title={`Balance: $${currentBalance}`}>
                <CardShop showBalance={false} />
            </OverlayComponent>
        );
    }

    if (currentOverlay === Overlay.HELP) {
        return (
            <OverlayComponent title="Help">
                <Help />
            </OverlayComponent>
        );
    }

    if (currentOverlay === Overlay.SETTINGS) {
        return (
            <OverlayComponent title="Settings">
                <Settings />
            </OverlayComponent>
        );
    }

    return null;
};

const MobileGameContentPane: React.FunctionComponent = () => {
    const currentOverlay = useSelector<AppState, Overlay>(state => state.ui.currentOverlay);

    if (currentOverlay === null) {
        return (
            <div className="content-pane">
                <p className="connection-warning">If you encounter connection issues, please refresh and press "Find Game" to reconnect</p>

                <NowPlaying />

                <Profile />

                <BoardContainer />
            </div>
        );
    }

    return (
        <div className="content-pane">
            <GameOverlay currentOverlay={currentOverlay} />
        </div>
    );
};

const MobileGame: React.FunctionComponent = () => {
    return (
        <div className="game mobile portrait">
            <div className="top-bar">
                <RoundIndicator />

                <PhaseInfo />
            </div>

            <MobileGameContentPane />

            <Navbar />
        </div>
    );
};

export { MobileGame };
