import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { emailService } from "../../utils/emailService.js";
import { User } from "../../models/users.models.js";
import { json } from "express";

// Register Controller

const register = asyncHandler(async (req, res) => {
  const { username, fullName, email, password } = req.body;
  //   console.log(req.body);

  if (!username || !fullName || !email || !password) {
    throw new ApiError(400, "all fields are required");
  }

  // regex for email and password
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  const passwordRegex =
    /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{7,30}$/gm;
  if (!emailRegex.exec(email)) {
    throw new ApiError(400, "invalid email");
  }
  if (!passwordRegex.exec(password)) {
    throw new ApiError(400, "invalid password");
  }
  if (username === fullName) {
    throw new ApiError(400, "username must be unique and not same as your fullname");
  }
  if (password === username || password === fullName || password === email) {
    throw new ApiError(400, "password should not same as username, fullname or email");
  }
  if (password.length < 6) {
    throw new ApiError(400, "password must be at least 6 characters");
  }
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new ApiError(
      400,
      "user already exists"
      //   ,[
      //   {
      //     field: existingUser.username === username ? "username" : "email",   // it will help for making error-stacks, and store in array of field and message
      //     message: "This value is already taken",
      //   },
      // ]
    );
  }
  const registerUser = await User.create({
    username: sanitize(username.toLowerCase()),
    fullName: sanitize(fullName.toLowerCase()),
    email: email.toLowerCase(),
    password: password,
  });

  const created_user = await User.findById(registerUser._id).select(
    "-password -refreshToken -resetPasswordToken -resetPasswordExpires"
  );
  //   console.log(created_user);
  if (!created_user) {
    throw new ApiError(500, "something went wrong while creating user");
  }
  // Send welcome email
  try {
    await emailService.sendWelcomeEmail(created_user);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    // Don't throw error here, as user is already registered
  }
  return res.status(201).json(new ApiResponse(201, created_user, "user created successfully"));
});

function sanitize(input) {
  return input.replace(/[^a-zA-Z0-9]/g, "");
}

export { register };
