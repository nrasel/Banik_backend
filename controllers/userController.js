const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const validatedMongoDbId = require("../utils/validatedMongoDbId");
const { generateRefreshToken } = require("../config/refressToken");
const jwt = require("jsonwebtoken");

module.exports.createUser = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;

  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    const newUser = userModel.create(req.body);
    res.json({
      newUser,
    });
  } else {
    throw new Error("User Already Exist");
  }
});

// login controller
module.exports.loginController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // chekc if user exist or not
  const findUser = await userModel.findOne({ email });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser._id);
    const updateUser = await userModel.findByIdAndUpdate(
      findUser._id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.lastname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// get all user
module.exports.getAllUser = expressAsyncHandler(async (req, res) => {
  try {
    const getUsers = await userModel.find({});
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// get a single user
module.exports.getAUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validatedMongoDbId(id);
  try {
    const getaUser = await userModel.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// delete a user
module.exports.deleteAUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validatedMongoDbId(id);
  try {
    const deleteUser = await userModel.findByIdAndDelete(id);
    res.json({
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// handle refresh token
module.exports.handleRefreshToken = expressAsyncHandler(async (req, res) => {
  const cookie = req.cookies;
  // console.log(cookie);
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookes");
  const refreshToken = cookie.refreshToken;
  const user = await userModel.findOne({ refreshToken });
  if (!user) throw new Error("No Refresh token present in db");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    } else {
      const accessToken = generateToken(user._id);
      res.json({
        accessToken,
      });
    }
  });
});

// updated a user
module.exports.updatedAUser = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  validatedMongoDbId(_id);
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      _id,
      {
        firstname: req.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json({
      updatedUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// user block
module.exports.blockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validatedMongoDbId(id);
  try {
    const block = await userModel.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User Blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports.unblockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validatedMongoDbId(id);
  try {
    const unblock = await userModel.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});
