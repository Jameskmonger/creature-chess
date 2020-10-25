import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store";
import { ConnectionStatus } from "@creature-chess/shared";

const ReconnectModal: React.FunctionComponent = () => {
    const connectionStatus = useSelector<AppState, ConnectionStatus>(state => state.ui.connectionStatus);

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
                        <p className="text">You've been disconnected - but you can get back in!</p>
                        <p className="text">Please refresh the page and press 'Find Game' to rejoin</p>
                    </>
                )
            }
        </div>
    );
};

export { ReconnectModal };
