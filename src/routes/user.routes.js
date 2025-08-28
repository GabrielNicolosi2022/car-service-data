import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/user.controller.js";
import { validateAsAdmin } from "../middlewares/user.middlewares.js";

const userRouter = Router();

userRouter.get("/", validateAsAdmin, getAllUsers); // WARN: Only the development team can use this controller, should create a middleware to check if the user is part of the development team (admin).

userRouter.get("/:id", getCurrentUser); // WARN: This controller should be preceded by a middleware that checks if the user is authenticated.

userRouter.patch("/:id", updateCurrentUser); // WARN: This controller should be preceded by a middleware that checks if the user is authenticated.

userRouter.delete("/:id", validateAsAdmin, deleteUser); // WARN: This controller should be preceded by a middleware that checks if the user is authenticated.

export default userRouter;
