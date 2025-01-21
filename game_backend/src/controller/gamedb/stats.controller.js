import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Game } from "../../models/games.models.js";

// Get game statistics with unique publishers
export const getGameStats = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Fetch total games owned by the user
  const totalGames = await Game.countDocuments({ owner: userId });

  // Fetch unique publishers for the user's games
  const uniquePublishers = await Game.distinct("publisher", { owner: userId });

  // Fetch distinct tags for the user's games
  const tags = await Game.distinct("tags", { owner: userId });

  // Fetch the most recent games owned by the user
  const recentGames = await Game.find({ owner: userId })
    .select("title publisher release_date")
    .sort({ release_date: -1 })
    .limit(5);

  // Construct statistics
  const stats = {
    totalGames,
    totalPublishers: uniquePublishers.length, // Count of unique publishers
    totalTags: tags.length,
    recentGames,
    lastUpdated: new Date(),
  };

  return res.status(200).json(new ApiResponse(200, stats, "Game statistics retrieved successfully"));
});
