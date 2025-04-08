import request from "supertest";
import app from "../../src/app.js";
import mongoose from "mongoose";
import config from "../../src/config/config.js";
import * as mocks from "../mocks/user.mock.js";
import { expect } from "chai";

const dbURI = config.db.cs;

describe("User API integration tests", function () {
  this.timeout(6000);

  before(async () => {
    await mongoose.connect(dbURI);
  });

  after(async () => {
    // Despues de todos los test cerrar la conexión
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await mongoose.connection.collections.users.deleteMany({});
  });

  describe("POST /register", () => {
    it("Should register a new user and return 201", async () => {
      const response = await request(app)
        .post("/v1/api/sessions/register")
        .send(mocks.commonUser);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("status", "Success");
      expect(response.body.payload).to.have.property(
        "email",
        mocks.commonUser.email
      );
    });

    it("should return 400 if the user already exists", async () => {
      await request(app)
        .post("/v1/api/sessions/register")
        .send(mocks.commonUser);

      const response = await request(app)
        .post("/v1/api/sessions/register")
        .send(mocks.commonUser);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property("status", "Error");
      expect(response.body.message).to.include("duplicate key error");
    });

    it("should return 400 for invalid data", async () => {
      const response = await request(app)
        .post("/v1/api/sessions/register")
        .send(mocks.invalidUser);

      expect(response.status).to.equal(400);
    });
  });

  describe("POST /login", () => {
    it("should login an user and return 200", async () => {
      await request(app)
        .post("/v1/api/sessions/register")
        .send(mocks.commonUser);

      const response = await request(app)
        .post("/v1/api/sessions/login")
        .send(mocks.correctLogin);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("status", "Success");
      expect(response.body).to.have.property(
        "message",
        "Session init successfully"
      );
    });

    it("should return 400 for invalid credentials", async () => {
      await request(app)
        .post("/v1/api/sessions/register")
        .send(mocks.commonUser);

      const response = await request(app)
        .post("/v1/api/sessions/login")
        .send(mocks.LoginWhitoutEmail);

      expect(response.status).to.equal(400);
      expect(response.body.errors[0]).to.have.property(
        "msg",
        "Email is required"
      );
    });

    it("should return 400 for Incorrect password", async () => {
      await request(app)
        .post("/v1/api/sessions/register")
        .send(mocks.commonUser);

      const response = await request(app)
        .post("/v1/api/sessions/login")
        .send(mocks.LoginWhitoutPassword);

      expect(response.status).to.equal(400);
      expect(response.body.errors[0]).to.have.property(
        "msg",
        "Password is required"
      );
    });
  });
});
