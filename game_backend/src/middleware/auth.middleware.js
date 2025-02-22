import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// export const verifyJWT = asyncHandler(async (req, res, next) => {
//     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//         throw new ApiError(401, "Unauthorized request");
//     }

//     try {
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
//         const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

//         if (!user) {
//             throw new ApiError(401, "Invalid Access Token");
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         throw new ApiError(401, error?.message || "Invalid access token");
//     }
// });

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await User.findById(decodedToken?._id).select("--password --refreshToken");

    if (!user) {
      throw new ApiError(401, "invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Token");
  }
});
