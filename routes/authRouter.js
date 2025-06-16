import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  getCurrentUserController,
} from "../controllers/authControllers.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import validateBody from "../helpers/validateBody.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), registerController);
authRouter.post("/login", validateBody(loginSchema), loginController);
authRouter.post("/logout", logoutController);
authRouter.get("/current", getCurrentUserController);
export default authRouter;
