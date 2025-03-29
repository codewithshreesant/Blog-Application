import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateToken = async (userId) => {
  try {
    const user = await User.findById({ _id: userId });
    const token = user.JwtToken();
    user.verifyToken = token;
    await user.save({ validateBeforeSave: false });
    return { token: token };
  } catch (error) {
    console.error("Error while generating token: ", error);
    throw new ApiError(402, error.message);
  }
};

const passwordCompare = async (userId, password) => {
  try {
    const user = await User.findById({ _id: userId });
    const isPasswordCorrect = await user.comparePassword(password);
    console.log("is password correct ", isPasswordCorrect);
    return isPasswordCorrect;
  } catch (error) {
    console.error("Error comparing password: ", error);
    throw new ApiError(500, "Internal Server Error during password comparison"); 
  }
};

const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if ([username, email, password].some((field) => !field)) { 
    throw new ApiError(402, "All fields are required!");
  }

  const isUserExist = await User.findOne({ email }); 

  if (isUserExist) {
    throw new ApiError(402, "User already exists");
  }

  const newUser = await User.create({
    username,
    email,
    password,
  });

  const user = await newUser.save();

  res
    .status(200)
    .json(new ApiResponse(200, "User Created Successfully", user));
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
        .status(401)
        .json(new ApiResponse(401, "Email and password is required"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  try {
    const isPasswordCorrect = await passwordCompare(user._id, password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json(new ApiResponse(401, "Incorrect Password"));
    }

    const { token } = await generateToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), 
    };

    res.cookie("token", token, cookieOptions);

    res
      .status(200)
      .json(new ApiResponse(200, "User LoggedIn Successfully", user));
  } catch (error) {
        console.error("Login Error: ", error);
        return res.status(500).json(new ApiResponse(500, "Login Failed"));
  }

});

const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res
    .status(200)
    .json(new ApiResponse(200, "User LoggedOut Successfully"));
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  if (!users || users.length === 0) { 
    throw new ApiError(404, "No users found");
  }

  res.status(200).json(new ApiResponse(200, "All Users", users));
});

export { registerUser, loginUser, logoutUser, getAllUsers };