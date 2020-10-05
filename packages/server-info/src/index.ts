import express = require("express");
import { createDatabaseConnection } from "@creature-chess/data";
import { leaderboard } from "./leaderboard";

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

app.get("/leaderboard", leaderboard(database));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
