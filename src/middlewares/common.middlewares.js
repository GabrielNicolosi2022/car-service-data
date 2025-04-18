import getLogger from "../utils/logger.utils.js";

const log = getLogger();

export const sessionInitVeryfication = (req, res, next) => {
  if (!req.session.user) {
    log.error("Unauthorized acces to this resource");
    return res.status(401).json({ status: "Error", message: "Unauthorized" });
  }
  next();
};
