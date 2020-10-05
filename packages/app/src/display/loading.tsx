import * as React from "react";

const Loading: React.FunctionComponent = () => {
    return (
        <div className="loading-full">
            <h1>Loading...</h1>

            <p>This can sometimes take up to 30 secs</p>
        </div>
    );
};

export { Loading };
