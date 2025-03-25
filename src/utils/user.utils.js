import { create } from "../services/user.services.js";
import { createHash } from "./bcrypt.utils.js";
import getLogger from "./logger.utils.js";

const log = getLogger();

export const createUser = async ({
  first_name,
  last_name,
  nickname,
  email,
  password,
  thumbnail,
  role,
}) => {
  try {
    const newUser = {
      first_name,
      last_name,
      nickname,
      email,
      password: createHash(password),
      thumbnail,
      role,
    };

    const result = await create(newUser);

    return result;
  } catch (error) {
    log.error("Error creating user:", error);
    throw error;
  }
};
