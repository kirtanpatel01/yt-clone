import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password } = req.body;  

  if (
    [username, fullName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fileds are required!")
  }

  const existedUser = await User.findOne({
    $or: [{ username }, {email}]
  })

  if(existedUser) {
    throw new ApiError(409, "Email or Username already exists!")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required!")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar) {
    throw new ApiError(400, "Avatar file is required!")
  }

  const user  = await User.create({
    username: username.toLowerCase(),
    fullName,
    email,
    password,
    avatar: avatar,
    coverImage: coverImage || "",
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user!")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully!")
  );
});

// const simple = asyncHandler(async (req, res, next) => {
//   const { username, fullName, email, password } = req.body;

//   if (
//     [username, fullName, email, password].some((field) => field?.trim() === "")
//   ) {
//     throw new ApiError(400, "All fileds are required!")
//   }

//   const existedUser = await User.findOne({
//     $or: [{ username }, {email}]
//   })

//   if(existedUser) {
//     throw new ApiError(409, "Email or Username already exists!")
//   }

//   // console.log("Files received:", req.files);

//   const avatarLocalPath = req.files?.avatar[0]?.path;
//   const coverImageLocalPath = req.files?.coverImage[0]?.path;

//   // console.log(avatarLocalPath)
//   // console.log(coverImageLocalPath)

//   if(!avatarLocalPath) {
//     throw new ApiError(400, "Avatar file is required!")
//   }

//   const avatarUrl = await uploadOnCloudinary(avatarLocalPath)
//   const coverImageUrl = await uploadOnCloudinary(coverImageLocalPath)

//   // console.log(avatar)
//   // console.log(coverImage)

//   if(!avatarUrl) {
//     throw new ApiError(400, "Avatar file is required!")
//   }

//   const user  = await User.create({
//     username: username.toLowerCase(),
//     fullName,
//     email,
//     password,
//     avatar: avatarUrl,
//     coverImage: coverImageUrl || "",
//   })

//   const createdUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   )

//   if(!createdUser) {
//     throw new ApiError(500, "Something went wrong while registering the user!")
//   }

//   return res.status(201).json(
//     new ApiResponse(200, createdUser, "User registered successfully!")
//   );
// })

export { registerUser };
