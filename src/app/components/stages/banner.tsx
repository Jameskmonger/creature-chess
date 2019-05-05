import * as React from "react";

interface BannerProps {
    message: string;
}

const Banner: React.FunctionComponent<BannerProps> = ({ message }) => {
    return <div className="banner">{message}</div>;
};

export {
    Banner
};
