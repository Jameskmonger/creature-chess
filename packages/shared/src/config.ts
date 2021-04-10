import { ENVIRONMENT } from "./environment";
import { config as liveConfig } from "./config.live";
import { config as localConfig } from "./config.local";

export const environment = ENVIRONMENT.LIVE as ENVIRONMENT;

export const config = environment === ENVIRONMENT.LOCAL ? localConfig : liveConfig;
