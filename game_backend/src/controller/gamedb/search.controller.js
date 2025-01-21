import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Game } from "../../models/games.models.js";
import redisService from "../../services/redis.service.js";

// Search games with Redis caching

export const searchGames = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  if (!query) {
    throw new ApiError(400, "Search query is required");
  }

  const cacheKey = `search:${query}:${page}:${limit}`;
  const cachedResults = await redisService.getCache(cacheKey);

  if (cachedResults) {
    return res.status(200).json(new ApiResponse(200, cachedResults, "Search results retrieved from cache"));
  }

  const searchQuery = {
    $or: [
      { title: { $regex: query, $options: "i" } },
      { tags: { $in: [new RegExp(query, "i")] } },
      { publisher: { $regex: query, $options: "i" } },
      { "description.about": { $regex: query, $options: "i" } },
    ],
  };

  const games = await Game.find(searchQuery).select("-__v").sort({ createdAt: -1 }).skip(skip).limit(limit);

  const total = await Game.countDocuments(searchQuery);

  const response = {
    games,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalGames: total,
    searchQuery: query,
  };

  // Cache search results for 15 minutes
  await redisService.setCache(cacheKey, response, 900);

  return res.status(200).json(new ApiResponse(200, response, "Search results retrieved successfully"));
});
