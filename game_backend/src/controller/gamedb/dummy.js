import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Game } from "../../models/games.models.js";
import redisService from "../../services/redis.service.js";
// Get game statistics with Redis caching
export const getGameStats = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const cacheKey = "game:stats";
  const cachedStats = await redisService.getCache(cacheKey);

  if (cachedStats) {
    return res.status(200).json(new ApiResponse(200, cachedStats, "Game statistics retrieved from cache"));
  }

  const totalGames = await Game.countDocuments({ owner: userId });
  const publishers = await Game.distinct("publisher");
  const tags = await Game.distinct("tags");

  const recentGames = await Game.find().select("title publisher release_date").sort({ release_date: -1 }).limit(5);

  const stats = {
    totalGames,
    totalPublishers: publishers.length,
    totalTags: tags.length,
    recentGames,
    lastUpdated: new Date(),
  };

  // Cache stats for 1 hour
  await redisService.setCache(cacheKey, stats, 3600);

  return res.status(200).json(new ApiResponse(200, stats, "Game statistics retrieved successfully"));
});
