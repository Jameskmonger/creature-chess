import * as React from "react";
import { useSelector } from 'react-redux';
import { AppState } from '../store/state';
import { ConnectionStatus } from '@common';

const ReconnectModal: React.FunctionComponent = () => {
    const connectionStatus = useSelector<AppState, ConnectionStatus>(state => state.game.connectionStatus);

    if (
        connectionStatus === ConnectionStatus.NOT_CONNECTED
        || connectionStatus === ConnectionStatus.CONNECTED
    ) {
        return null;
    }

    return (
        <div className="reconnect">
            {
                connectionStatus === ConnectionStatus.DISCONNECTED
                && (
                    <>
                        <p className="text">Oops - you've been disconnected</p>
                        <p className="text">Please wait while we reconnect you...</p>
                    </>
                )
            }
            {
                connectionStatus === ConnectionStatus.RECONNECTED
                && (
                    <>
                        <p className="text">You're now reconnected!</p>
                        <p className="text">You will be back in the game at the start of the next round</p>
                    </>
                )
            }
        </div>
    );
};

export { ReconnectModal };