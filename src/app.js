import "dotenv/config";
import express, { json, urlencoded } from "express";
import config from "./config/config.js";
import cors from "cors";
import __dirname from "./dirname.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import getLogger from "./utils/logger.utils.js";
import db from "./config/dbConnection.js";
import indexRouter from "./routes/index.routes.js";

/* CONFIGURATIONS */
const app = express();
const port = config.server.port;

/* Express */
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

/* Session */
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.db.cs,
      ttl: config.session.ttl,
    }),
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true,
  })
);

/* Logger */
const log = getLogger();

/* Morgan */
app.use(morgan("dev"));

/* Routes */
app.use(indexRouter);

/* Server */
const server = app.listen(port, (err) => {
  db;
  if (err) {
    log.error("*** CONNECTION ERROR ***: ", err.message);
    return;
  }
  log.info(`Running on port ${port}, in ${config.environment.env} mode.`);
});
