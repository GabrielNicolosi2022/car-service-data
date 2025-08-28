import { check, validationResult } from "express-validator";
import getLogger from "../utils/logger.utils.js";

const log = getLogger();

const validateUsersFields = [
  check("first_name")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string"),
  check("last_name")
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string"),
  check("nickname")
    .notEmpty()
    .withMessage("Nickname is required")
    .isString()
    .withMessage("Nickname must be a string")
    .isLength({ min: 3 })
    .withMessage("Nickname must be at least 3 characters long"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .normalizeEmail(),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      log.error("user.validations - Validation error: ", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    // If no errors, proceed to the next middleware
    next();
  },
];

const validateLoginFields = [
  check("email")
    .notEmpty()
    .withMessage("El campo Email es obligatorio.")
    .isEmail()
    .withMessage("El Email es inválido.")
    .normalizeEmail(),
  check("password")
    .notEmpty()
    .withMessage("El campo Password es obligatorio.")
    .isString()
    .withMessage("El Password debe ser un string.")
    .isLength({ min: 8 })
    .withMessage("El Password debe tener una longitud minima de 8 characters.")
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
    .withMessage(
      "El Password debe contener al menos una letra mayúscula, una letra minúscula, y un número."
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      log.error("user.validations - Validation error: ", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    // If no errors, proceed to the next middleware
    next();
  },
];
export { validateUsersFields, validateLoginFields };
