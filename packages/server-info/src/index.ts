import express = require("express");
import { createDatabaseConnection } from "@creature-chess/data";
const app = express();
const port = process.env.PORT || 3000;

const database = createDatabaseConnection(process.env.CREATURE_CHESS_FAUNA_KEY);

app.get("/leaderboard", async (req, res) => {
    const users = await database.leaderboard.getPlayers();

    res.send(users);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
