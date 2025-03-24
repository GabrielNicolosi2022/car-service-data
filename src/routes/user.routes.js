import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getCurrentUser,
  updateCurrentUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { sessionInitVeryfication } from "../middlewares/common.middlewares.js";
import {
  validateAsAdmin,
  validateCreateUser,
} from "../middlewares/user.middlewares.js";

const userRouter = Router();

userRouter.post("/", validateCreateUser, createUser);

userRouter.get("/", sessionInitVeryfication, validateAsAdmin, getAllUsers); // WARN: Only the development team can use this controller, should create a middleware to check if the user is part of the development team (admin).

userRouter.get("/:id", sessionInitVeryfication, getCurrentUser); // WARN: This controller should be preceded by a middleware that checks if the user is authenticated.

userRouter.patch("/:id", sessionInitVeryfication, updateCurrentUser); // WARN: This controller should be preceded by a middleware that checks if the user is authenticated.

userRouter.delete("/:id", sessionInitVeryfication, deleteUser); // WARN: This controller should be preceded by a middleware that checks if the user is authenticated.

export default userRouter;
