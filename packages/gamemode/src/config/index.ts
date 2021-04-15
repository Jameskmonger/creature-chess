import { config as liveConfig } from "./config.live";
import { config as localConfig } from "./config.local";

export const config = process.env.NODE_ENV === 'development' ? localConfig : liveConfig;
