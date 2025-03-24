import { validateFormatData } from "../helpers/commonValidations.helpers.js";
import { validateUsersFields } from "../validations/user.validations.js";
import getLogger from "../utils/logger.utils.js";

const log = getLogger();

export const validateCreateUser = [validateFormatData, ...validateUsersFields];

export const validateAsAdmin = (req, res, next) => {
  if (req.session.user.role !== "admin") {
    log.error("Forbiden acces to this resource");
    return res
      .status(403)
      .json({ status: "Error", message: "Forbiden Access" });
  }
  next();
};
