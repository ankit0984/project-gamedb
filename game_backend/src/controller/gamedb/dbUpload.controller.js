// thhis controller is associated with creation of gamedb
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Game } from "../../models/games.models.js";

export const gamedb = asyncHandler(async (req, res) => {
  // Extract data from request body
  const {
    title,
    url,
    image,
    description,
    release_date,
    publisher,
    tags,
    original_size,
    repack_size,
    download_url,
    trailer,
    screenshots,
    system_req,
  } = req.body;

  // console.log(req.body);

  // Validate required fields
  if (
    !title ||
    !url ||
    !image?.src ||
    !image?.alt ||
    !description?.about ||
    !release_date ||
    !publisher ||
    !tags?.length ||
    !original_size ||
    !repack_size ||
    !trailer ||
    !screenshots?.snap1 ||
    !screenshots?.snap2 ||
    !screenshots?.snap3 ||
    !screenshots?.snap4 ||
    !system_req?.minimum_req ||
    !system_req?.recommended_req
  ) {
    throw new ApiError(400, "All required fields must be provided");
  }

  // Process tags if they come as a string
  const processedTags = Array.isArray(tags) ? tags : tags.split(",").map((tag) => tag.trim());

  const existingGame = await Game.findOne({ title });
  if (existingGame) {
    throw new ApiError(400, "Game already exists");
  }

  // Create new game document
  const game = await Game.create({
    title,
    url,
    image: {
      src: image.src,
      alt: image.alt,
    },
    description: {
      about: description.about,
    },
    release_date: new Date(release_date),
    publisher,
    tags: processedTags,
    original_size,
    repack_size,
    download_url: {
      onedrive: download_url?.onedrive,
      torrent: download_url?.torrent,
      fast_url: download_url?.fast_url,
    },
    trailer,
    screenshots: {
      snap1: screenshots.snap1,
      snap2: screenshots.snap2,
      snap3: screenshots.snap3,
      snap4: screenshots.snap4,
    },
    system_req: {
      minimum_req: {
        os: Array.isArray(system_req.minimum_req.os) ? system_req.minimum_req.os : [system_req.minimum_req.os],
        processor: system_req.minimum_req.processor,
        memory: system_req.minimum_req.memory,
        graphics: system_req.minimum_req.graphics,
        storage: system_req.minimum_req.storage,
        audio: system_req.minimum_req.audio,
      },
      recommended_req: {
        os: Array.isArray(system_req.recommended_req.os)
          ? system_req.recommended_req.os
          : [system_req.recommended_req.os],
        processor: system_req.recommended_req.processor,
        memory: system_req.recommended_req.memory,
        graphics: system_req.recommended_req.graphics,
        storage: system_req.recommended_req.storage,
        audio: system_req.recommended_req.audio,
      },
    },
    owner: req.user?._id, // Assuming you have user authentication middleware
  });

  return res.status(201).json(new ApiResponse(201, game, "Game uploaded successfully"));
});
