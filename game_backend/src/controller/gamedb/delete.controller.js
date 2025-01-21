import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { Game } from "../../models/games.models.js";

export const deleteGame = asyncHandler(async (req, res) => {
  const gametitle = req.body.title;

  if (!gametitle) {
    throw new ApiError(400, "Game title is required");
  }

  //Check if the game exists
  const game = await Game.findOne({ title: gametitle });

  if (!game) {
    throw new ApiError(404, `Game title "${gametitle}" not found`);
  }

  // Delete the game
  await Game.findOneAndDelete({ title: gametitle });

  return res.status(200).json({
    success: true,
    message: `Game "${gametitle}" deleted successfully`,
    game: {
      title: game.title,
      genre: game.genre,
      price: game.price,
      platform: game.platform,
      // Include any other game properties you want to show
      _id: game._id,
    },
  });
});

// deleted game from gamedb is The Last of Us: Part I, Grand Theft Auto V / GTA 5, Marvel’s Spider-Man Remastered
