import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../../models/users.models.js";
import { emailService } from "../../utils/emailService.js";
import crypto from "crypto";

export const changePassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    throw new ApiError(400, "Token and new password are required");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired reset token");
  }

  // Set new password - it will be hashed by the pre-save middleware
  user.password = newPassword;

  // Clear reset token fields
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  // Save the updated password
  await user.save();

  // Send password reset success email
  try {
    await emailService.sendPasswordResetSuccessEmail(user, req);
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    // Don't throw error as password is already reset
  }

  return res.status(200).json(new ApiResponse(200, {}, "Password reset successful"));
});
