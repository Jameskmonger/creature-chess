import * as React from "react";
import { BoardContainer } from "./boardContainer";
import { DropToSell } from "@app/features/cardShop/dropToSell";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@app/store";
import { Overlay } from "@app/overlay";
import { closeOverlay, openOverlay } from "@app/store/actions/uiActions";
import { CardShop } from "@app/features/cardShop/cardShop";

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

const GameOverlay: React.FunctionComponent<{ currentOverlay: Overlay }> = ({ currentOverlay }) => {
    const dispatch = useDispatch();
    const currentBalance = useSelector<AppState, number>(state => state.game.money);

    if (!currentOverlay) {
        return null;
    }

    if (currentOverlay === Overlay.SHOP) {
        return (
            <div className="game-overlay">
                <div className="overlay-header">
                    <h2 className="overlay-title">Balance: ${currentBalance}</h2>
                    <button className="close" onClick={() => dispatch(closeOverlay())}>X</button>
                </div>
                <div className="overlay-content">
                    <CardShop showBalance={false} />
                </div>
            </div>
        );
    }

    return null;
}

const MobileGameContentPane: React.FunctionComponent = () => {
    const currentOverlay = useSelector<AppState, Overlay>(state => state.ui.currentOverlay);

    // if (1 === 2) {
    //     return (
    //         <div className="content-pane">
    //             <BoardContainer />

    //             <DropToSell />
    //         </div>
    //     );
    // }

    if (currentOverlay) {
        return (
            <div className="content-pane">
                <GameOverlay currentOverlay={currentOverlay} />
            </div>
        );
    }

    return (
        <div className="content-pane">
            <BoardContainer />
            <DropToSell />
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
