import express from "express";
import authControllers from "../controllers/authControllers.js";
import {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
} from "../schemas/authSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  authControllers.registerController
);
authRouter.post(
  "/login",
  validateBody(loginSchema),
  authControllers.loginController
);
authRouter.post("/logout", authenticate, authControllers.logoutController);
authRouter.get(
  "/current",
  authenticate,
  authControllers.getCurrentUserController
);
authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(updateSubscriptionSchema),
  authControllers.updateSubscriptionController
);
authRouter.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatarController
);
export default authRouter;
