import express = require("express");
import { createDatabaseConnection } from "@creature-chess/data";
const app = express();
const port = process.env.PORT || 3000;

const database = createDatabaseConnection(process.env.CREATURE_CHESS_FAUNA_KEY);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    next();
});

const createLeaderboardCache = () => {
    const TIME_LIVE = 120 * 1000;
    let cachedValue = null;
    let cacheValidUntil = null;

    return async () => {
        const currentTime = Date.now();
        if (cachedValue && currentTime < cacheValidUntil) {
            console.log("Retrieved cached leaderboard value");
            return cachedValue;
        }

        console.log("Getting new value from database");

        const users = await database.leaderboard.getPlayers();

        if (users) {
            console.log("Setting new cached value");
            cachedValue = users;
            cacheValidUntil = Date.now() + TIME_LIVE;
            return users;
        }

        console.log("Falling back to cached value");

        return cachedValue;
    };
};
const getLeaderboardPlayers = createLeaderboardCache();

app.get("/leaderboard", async (req, res) => {
    const users = await getLeaderboardPlayers();

    res.send(users);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
