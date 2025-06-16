import bcrypt from "bcrypt";
import usersService from "../services/usersService.js";
import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/controllerWrapper.js";

const registerController = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.getUserByEmail(email);
  if (user) throw HttpError(409, "User already exists");
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await usersService.addUser({ email, password: hashPassword });
  return res.status(201).json(newUser);
};
const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.getUserByEmail(email);
  if (!user) throw HttpError(401, "Email or password is not valid");
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw HttpError(401, "Email or password is not valid");
  return res.status(200).json(user);
};
const logoutController = async (req, res) => {};
const getCurrentUserController = async (req, res) => {};

export default {
  registerController: controllerWrapper(registerController),
  loginController: controllerWrapper(loginController),
  logoutController: controllerWrapper(logoutController),
  getCurrentUserController: controllerWrapper(getCurrentUserController),
};
