import * as React from "react";
import { BoardContainer } from "./boardContainer";
import { DropToSell } from "@app/features/cardShop/dropToSell";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@app/store";
import { Overlay } from "@app/overlay";
import { closeOverlay, openOverlay } from "@app/store/actions/uiActions";

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

const MobileGame: React.FunctionComponent = () => {
    return (
        <div className="game mobile portrait">
            <BoardContainer />

            <DropToSell />

            <Navbar />
        </div>
    );
};

export { MobileGame };
