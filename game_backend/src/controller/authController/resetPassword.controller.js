// request for password reset by sending mail for reset password
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../../models/users.models.js";
import { emailService } from "../../utils/emailService.js";
import crypto from "crypto";

export const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // Save token to user
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  try {
    // Send reset email using the new email service
    await emailService.sendPasswordResetEmail(user.email, resetToken);

    res.status(200).json(new ApiResponse(200, {}, "Password reset email sent successfully"));
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    throw new ApiError(500, "Error sending password reset email");
  }
});
