import express = require("express");
import { ManagementClient } from "auth0";
import { UserAppMetadata } from "@creature-chess/auth-server";
import { createDatabaseConnection } from "@creature-chess/data";
import { leaderboard } from "./leaderboard";
import { userCurrent } from "./user";

const app = express();
const port = process.env.PORT || 3000;

const database = createDatabaseConnection(process.env.CREATURE_CHESS_FAUNA_KEY);
const AUTH0_CONFIG = {
    domain: "creaturechess.eu.auth0.com",
    clientId: "gWNTtsTNepgyyqE7QAEC4e7nt5A3ZZ4k",
    clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET
};
const authClient = new ManagementClient<UserAppMetadata>({
    domain: AUTH0_CONFIG.domain,
    clientId: AUTH0_CONFIG.clientId,
    clientSecret: AUTH0_CONFIG.clientSecret
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get("/leaderboard", leaderboard(database));

app.get("/user/current", userCurrent(database, authClient));

app.listen(port, () => {
    console.log(`server-info listening on port ${port}`);
});
