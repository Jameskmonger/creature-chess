import * as React from "react";
import { connect, MapStateToProps } from "react-redux";
import { AppState } from "../../store/store";

interface BannerProps {
    message: string;
}

const BannerUnconnected: React.FunctionComponent<BannerProps> = ({ message }) => {
    return <div className="banner">{message}</div>;
};

const mapStateToProps: MapStateToProps<BannerProps, {}, AppState> = state => ({
    message: state.game.bannerMessage
});

const Banner = connect(mapStateToProps)(BannerUnconnected);

export {
    BannerUnconnected,
    Banner
};
