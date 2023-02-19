const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");

module.exports.createUser = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;

  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    const newUser = userModel.create(req.body);
    res.json({
      _id: findUser?._id,
      firstname: findUser?.lastname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
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
    res.json(findUser);
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
  try {
    const deleteUser = await userModel.findByIdAndDelete(id);
    res.json({
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});
