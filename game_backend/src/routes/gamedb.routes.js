import { Router } from "express";
import { gamedb } from "../controller/gamedb/dbUpload.controller.js";
import { getUserGames } from "../controller/gamedb/gdb.controller.js";
import { searchGames } from "../controller/gamedb/search.controller.js";
import { getGameStats } from "../controller/gamedb/stats.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { deleteGame } from "../controller/gamedb/delete.controller.js";
import { searchGamesData } from "../controller/gamedb/singleGame.controller.js";

const game_router = Router();

// Upload game route
game_router.route("/gamedb").post(verifyJWT, gamedb);

// Game retrieval routes with Redis caching
game_router.route("/gamedb/:userId/games").get(verifyJWT, getUserGames);
game_router.route("/gamedb/search").get(verifyJWT, searchGames); //http://localhost:3636/api/search?query=ghost%20of
game_router.route("/gamedb/gamedata/search").get(verifyJWT, searchGamesData); //http://localhost:3636/api/search?query=ghost%20of
game_router.route("/gamedb/:userId/stats").get(verifyJWT, getGameStats); // Get stats for specific user
game_router.route("/gamedb/delete").delete(verifyJWT, deleteGame);
export { game_router };
