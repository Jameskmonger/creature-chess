import express = require("express");
import { json as jsonParser } from "body-parser";
import Filter = require("bad-words");
import { ManagementClient } from "auth0";
import { UserAppMetadata } from "@creature-chess/auth-server";
import { createDatabaseConnection } from "@creature-chess/data";
import { leaderboard } from "./leaderboard";
import { userGetCurrent, userPatchCurrent } from "./user";
import { config } from "@creature-chess/gamemode";

const app = express();
const port = process.env.PORT || 3000;

const database = createDatabaseConnection(process.env.CREATURE_CHESS_FAUNA_KEY);
const AUTH0_CONFIG = {
    domain: config.auth0.domain,
    clientId: config.auth0.machineToMachineClientId,
    clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET
};
const authClient = new ManagementClient<UserAppMetadata>({
    domain: AUTH0_CONFIG.domain,
    clientId: AUTH0_CONFIG.clientId,
    clientSecret: AUTH0_CONFIG.clientSecret
});
const filter = new Filter();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, sentry-trace");
    next();
});

app.use(jsonParser());

app.get("/leaderboard", leaderboard(database));

app.get("/user/current", userGetCurrent(database, authClient));
app.patch("/user/current", userPatchCurrent(database, authClient, filter));

app.listen(port, () => {
    console.log(`server-info listening on port ${port}`);
});
