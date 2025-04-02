import { Router } from "express";
import passport from "passport";
import { userLogin, userRegister } from "../controllers/user.controller.js";
import {
  validateLoginFields,
  validateUsersFields,
} from "../validations/user.validations.js";
import upload from "../utils/upload.utils.js";

const sessionRouter = Router();

/* PASSPORT */

// Registro de usuario
sessionRouter.post(
  "/register",
  upload.single("thumbnail"),
  validateUsersFields,
  passport.authenticate("local-register"),
  userRegister
);

// Login de usuario mediante app
sessionRouter.post(
  "/login",
  upload.single(),
  validateLoginFields,
  passport.authenticate("local-login"),
  userLogin
);

// Test
sessionRouter.post("/test", upload.single("thumbnail"), (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  res.status(200).json({ body: req.body, file: req.file });
});

export default sessionRouter;
