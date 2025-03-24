import dotenv from "dotenv";

const config = {};

const environment = "development"; // change environment to 'production', 'development'or 'testing'.

dotenv.config({
  path:
    environment === "development"
      ? ".env.develoment"
      : environment === "testing"
      ? ".env.testing"
      : ".env.production",
});

config.environment = {
  env: process.env.NODE_ENV,
};

config.url = {
  url: process.env.BASE_URL,
};

config.server = {
  port: process.env.PORT,
};

config.db = {
  cs: process.env.MONGO_URI,
  dbUser: process.env.MONGO_USER,
  dbPass: process.env.MONGO_PASS,
  dbName: process.env.DB_NAME,
  testing: process.env.MONGO_TEST,
};

// console.log("config.js: ", config);

export default config;
