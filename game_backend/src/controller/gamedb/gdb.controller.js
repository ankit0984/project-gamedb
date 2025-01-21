import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Game } from "../../models/games.models.js";
import redisService from "../../services/redis.service.js";

// Get games by user ID with Redis caching
export const getUserGames = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  // const skip = (page - 1) * limit;

  // Try to get from cache first
  // const cacheKey = `user:${userId}:games:${page}:${limit}`;
  const cacheKey = `user:${userId}:games:${page}`;
  const cachedGames = await redisService.getCache(cacheKey);

  if (cachedGames) {
    return res.status(200).json(new ApiResponse(200, cachedGames, "User games retrieved from cache"));
  }

  // If not in cache, get from database
  const games = await Game.find({ owner: userId }).select("-__v").sort({ createdAt: -1 });
  //.skip(skip).limit(limit);

  const total = await Game.countDocuments({ owner: userId });

  const response = {
    games,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalGames: total,
  };

  // Cache the results for 30 minutes
  await redisService.setCache(cacheKey, response, 900); // 1800 for 30min cache time

  if (!games?.length) {
    return res.status(200).json(new ApiResponse(200, response, "No games found for this user"));
  }

  return res.status(200).json(new ApiResponse(200, response, "User games fetched successfully"));
});
