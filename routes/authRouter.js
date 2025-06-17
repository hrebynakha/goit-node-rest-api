import express from "express";
import authControllers from "../controllers/authControllers.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import validateBody from "../helpers/validateBody.js";
import auth from "../config/config-passport.js";

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
authRouter.post("/logout", auth, authControllers.logoutController);
authRouter.get("/current", auth, authControllers.getCurrentUserController);
export default authRouter;
