import * as React from "react";
import { BoardContainer } from "./boardContainer";
import { DropToSell } from "@app/features/cardShop/dropToSell";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@app/store";
import { Overlay } from "@app/overlay";
import { closeOverlay, openOverlay } from "@app/store/actions/uiActions";
import { CardShop } from "@app/features/cardShop/cardShop";
import { PlayerList } from "@app/features/playerList/playerList";
import { Profile } from "../profile/profile";
import { Help } from "./help";

const NavItem: React.FunctionComponent<{ overlay: Overlay, children: React.ReactNode }> = ({ overlay, children }) => {
    const dispatch = useDispatch();
    const isActive = useSelector<AppState, boolean>(state => state.ui.currentOverlay === overlay);

    const onClick = () => {
        if (isActive) {
            dispatch(closeOverlay());
            return;
        }

        dispatch(openOverlay(overlay));
    };

    return <button className={`navitem${isActive ? " active" : ""}`} onClick={onClick}>{children}</button>;
};

const Navbar: React.FunctionComponent = () => {
    return (
        <nav className="navbar">
            <NavItem overlay={Overlay.PLAYERS}>Players</NavItem>
            <NavItem overlay={Overlay.SHOP}>Shop</NavItem>
            <NavItem overlay={Overlay.HELP}>Help</NavItem>
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
    const dispatch = useDispatch();
    const currentBalance = useSelector<AppState, number>(state => state.game.money);

    if (currentOverlay === Overlay.PLAYERS) {
        return (
            <OverlayComponent title="Players">
                <Profile />
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

    return null;
};

const MobileGameContentPane: React.FunctionComponent = () => {
    const currentOverlay = useSelector<AppState, Overlay>(state => state.ui.currentOverlay);

    if (currentOverlay === null) {
        return (
            <div className="content-pane">
                <BoardContainer />
                <DropToSell />
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
            <MobileGameContentPane />

            <Navbar />
        </div>
    );
};

export { MobileGame };
