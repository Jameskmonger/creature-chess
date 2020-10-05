import * as React from "react";
import { BoardContainer } from "../../display/game/boardContainer";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChess, faCog, faQuestionCircle, faShoppingCart, faUsers, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { AppState } from "../../store";
import { Overlay } from "../../overlay";
import { closeOverlay, openOverlay } from "../../store/actions/uiActions";
import { CardShop } from "../../features/cardShop/cardShop";
import { PlayerList } from "../../features/playerList/playerList";
import { Profile } from "../../display/profile/profile";
import { Help } from "../../display/game/help";
import { RoundIndicator } from "../../display/roundIndicator";
import { PhaseInfo } from "../../display/phaseInfo";
import { getPlayerMoney } from "@creature-chess/shared/player/playerSelectors";
import { Settings } from "../../display/game/settings/settings";

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

                <Profile />
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
