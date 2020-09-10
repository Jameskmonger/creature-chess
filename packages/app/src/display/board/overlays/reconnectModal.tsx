import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import { ConnectionStatus } from "@creature-chess/shared/networking";

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
                        <p className="text">Please refresh the page and press 'Find Game' to rejoin</p>
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
        </div>
    );
};

export { ReconnectModal };
