import authServices from "../services/authServices.js";
import controllerWrapper from "../helpers/controllerWrapper.js";

const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const loginController = async (req, res) => {
  const token = await authServices.loginUser(req.body);
  res.json({ token });
};

const logoutController = async (req, res) => {
  await authServices.logoutUser(req.user);
  res.sendStatus(204);
};

const getCurrentUserController = async (req, res) => {
  res.json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
};

const updateSubscriptionController = async (req, res) => {
  const updatedUser = await authServices.updateSubscription({
    user: req.user,
    data: req.body,
  });
  res.json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

export default {
  registerController: controllerWrapper(registerController),
  loginController: controllerWrapper(loginController),
  logoutController: controllerWrapper(logoutController),
  getCurrentUserController: controllerWrapper(getCurrentUserController),
  updateSubscriptionController: controllerWrapper(updateSubscriptionController),
};
