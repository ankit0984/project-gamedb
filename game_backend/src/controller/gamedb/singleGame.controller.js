import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Game } from "../../models/games.models.js";
import redisService from "../../services/redis.service.js";

// Search games with Redis caching

export const searchGamesData = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    throw new ApiError(400, "Search query is required");
  }

  const cacheKey = `search:${query}`;
  const cachedResults = await redisService.getCache(cacheKey);

  if (cachedResults) {
    return res.status(200).json(new ApiResponse(200, cachedResults, "Search results retrieved from cache"));
  }

  const searchQuery = {
    title: { $regex: query, $options: "i" },
  };

  const games = await Game.findOne(searchQuery).select("-__v");

  const response = {
    games,
    searchQuery: query,
  };

  // Cache search results for 15 minutes
  await redisService.setCache(cacheKey, response, 900);

  return res.status(200).json(new ApiResponse(200, response, "Search results retrieved successfully"));
});
