import * as React from "react";
import { useSelector } from 'react-redux';
import { AppState } from '../store/state';

const ReconnectModal: React.FunctionComponent = () => {
    const isDisconnected = useSelector<AppState, boolean>(state => state.game.isDisconnected);

    if (isDisconnected === false) {
        return null;
    }

    return (
        <div className="reconnect">
            <p className="text">Oops - you've been disconnected</p>
            <p className="text">We're working on fixing this</p>
        </div>
    );
};

export { ReconnectModal };