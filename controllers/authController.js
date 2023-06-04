import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import User from "../models/User.js";
import checkPermissions from "../utils/checkPermissions.js";

// POST 🗯
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please fill out all fields");
  }
  // Check for duplicate email
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError(
      "Email address already in use, please try another"
    );
  }
  // const isFirstAccount = (await User.countDocuments({})) === 0
  // const role = isFirstAccount ? 'testUser' : 'user'

  const user = await User.create({ name, email, password });

  const token = user.createJWT();
  // 201
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      phoneNumber: user.phoneNumber,
    },
    token,
  });
};

// POST 🗯
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email address and password");
  }
  // .select("+password") to override the UserSchema password select:false, we need to return the password to compare them
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Email address or password is incorrect");
  }
  // user. is a instance method and is looking at the response object for the password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Password is incorrect");
  }
  const token = user.createJWT();
  // Set password to undefined, to prevent it from appearing in the response
  user.password = undefined;
  // 200
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
    phoneNumber: user.phoneNumber,
  });
};

// PATCH 🗯
const updateUser = async (req, res) => {
  const { name, email, lastName, location, phoneNumber } = req.body;
  if (!name || !name || !lastName || !location) {
    throw new BadRequestError("Please fill out all fields");
  }
  const user = await User.findOne({ _id: req.user.userId });
  // Test user read only ❕
  checkPermissions(req.user, req.user.userId);
  user.name = name;
  user.email = email;
  user.lastName = lastName;
  user.location = location;
  user.phoneNumber = phoneNumber;
  // save() will trigger the hook, findOneAndUpdate won't
  await user.save();

  // Not necessary, since not updating the _id, but nice to have, it refreshes the token
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
    phoneNumber: user.phoneNumber,
  });
};

export { register, login, updateUser };
