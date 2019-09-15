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
                connectionStatus === ConnectionStatus.DISCONNECTED_WILL_RECONNECT
                && (
                    <>
                        <p className="text">Oops - you've been disconnected</p>
                        <p className="text">Please wait while we reconnect you...</p>
                    </>
                )
            }
            {
                connectionStatus === ConnectionStatus.RECONNECTED_NEED_AUTHENTICATION
                && (
                    <>
                        <p className="text">Restoring connection with server</p>
                        <p className="text">Authenticating with server...</p>
                    </>
                )
            }
            {
                connectionStatus === ConnectionStatus.RECONNECTED
                && (
                    <>
                        <p className="text">Reconnected!</p>
                        <p className="text">Please wait for the current round to finish...</p>
                    </>
                )
            }
            {
                connectionStatus === ConnectionStatus.DISCONNECTED_FINAL
                && (
                    <>
                        <p className="text">Sorry - we couldn't reconnect you</p>
                        <p className="text">We're working on fixing this</p>
                    </>
                )
            }
        </div>
    );
};

export { ReconnectModal };