import authServices from "../services/authServices.js";
import controllerWrapper from "../helpers/controllerWrapper.js";

const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);

  res.status(201).json({
    email: newUser.email,
    username: newUser.username,
  });
};
const loginController = async (req, res) => {
  const token = await authServices.loginUser(req.body);
  res.json({ token });
};
const logoutController = async (req, res) => {};
const getCurrentUserController = async (req, res) => {};

export default {
  registerController: controllerWrapper(registerController),
  loginController: controllerWrapper(loginController),
  logoutController: controllerWrapper(logoutController),
  getCurrentUserController: controllerWrapper(getCurrentUserController),
};
