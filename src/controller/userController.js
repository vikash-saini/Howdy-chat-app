const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const { generateToken } = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, pic } = req.body;
  console.log(name, phone);

  if (!name || !phone) {
    res.status(400);
    throw new Error("please Enter all the feilds");
  }

  const userExits = await User.findOne({ phone });

  if (userExits) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, phone,email:"test@gmail.com", pic });
  console.log("user created ", user);
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);

    throw new Error("Failed to create new user");
  }
});

// user search
const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const allusers = await User.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.status(200);
  res.json(allusers);
});

const authUser = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  console.log(phone);

  const user = await User.findOne({ phone });
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    res.json("Unauthorised User");
    // throw new Error("Unauthorised User");
  }
});

module.exports = { registerUser, getAllUsers, authUser };
