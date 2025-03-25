import config from "../config/config.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { isValidPassword } from "../utils/bcrypt.utils.js";
import * as services from "../services/user.services.js";
import getLogger from "../utils/logger.utils.js";
import { createUser } from "../utils/user.utils.js";

const log = getLogger();

const initializePassport = () => {
  // Estrategia de registro local
  passport.use(
    "local-register",
    new LocalStrategy(
      { passRequestToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, nickname, thumbnail, role } = req.body;

        try {
          // Verificar si el email ya existe
          const userExist = await services.getByEmail({ email: username });
          if (userExist) {
            if (userExist.email === username) {
              return res
                .status(409)
                .json({ status: "Error", message: "Email already exists" });
            }
          }

          // procesar la imagen
          if (req.file) {
            thumbnail = req.file.buffer; // Almacenar el Buffer de la imagen en el campo thumbnail
          }

          const result = await createUser({
            first_name,
            last_name,
            nickname,
            email: username,
            password,
            thumbnail,
            role,
          });

          log.info("New user created");
          return done(null, result, { message: "New user created" });
        } catch (error) {
          log.fatal("Error al obtener el usuario: " + error.message);
          return done("error: " + error);
        }
      }
    )
  );

  // Estrategia de login local
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        passRequestToCallback: true,
        usernameField: "email",
      },
      async (req, email, password, done) => {
        try {
          const user = await services.getByEmail({ email });
          if (!email) {
            log.error("Incorrect credentials");
            return done(null, false, {
              message: "Incorrect credentials",
            });
          }

          const passwordMatch = isValidPassword(user, password);
          // log.info("passwordMatch: " + passwordMatch);
          if (!passwordMatch) {
            log.error("Incorrect password");
            return done(null, false, { message: "Incorrect password" });
          }
          log.info("local-login - userSession: ", user);
          log.info(`user ${user._id} succesfully logged in`);

          return done(null, user);
        } catch (error) {
          log.fatal("Error getting user: " + error);
          return done(error);
        }
      }
    )
  );

  // Serialización
  passport.serializeUser((user, done) => done(null, user.id));

  // Deserialización
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await services.getById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default initializePassport;
