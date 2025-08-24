// tests/userController.test.js
import request from "supertest";
import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserByIdController,
  getUserByEmailController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController.js";

// Mock dependencies
jest.mock("../models/userModel.js", () => ({
  createUser: jest.fn(),
  getUserByEmail: jest.fn(),
  getUserById: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

jest.mock("../helpers/BTE.js", () => ({
  comparePWD: jest.fn(),
  UserToken: jest.fn(),
}));

import {
  createUser as saveUser,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
} from "../models/userModel.js";
import { comparePWD, UserToken } from "../helpers/BTE.js";

// Express app
const app = express();
app.use(express.json());

// Register endpoints
app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/logout", logoutUser);
app.get("/user/:id/:userType", getUserByIdController);
app.get("/user/email/:email/:userType", getUserByEmailController);
app.put("/user/:id/:userType", updateUserController);
app.delete("/user/:id/:userType", deleteUserController);

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /register", () => {
    it("should register a new user", async () => {
      const mockUser = { userId: 1, email: "test@example.com", userType: "buyer" };
      saveUser.mockResolvedValue(mockUser);
      getUserByEmail.mockResolvedValue(null);
      UserToken.mockReturnValue("mockToken");

      const res = await request(app).post("/register").send({
        email: "test@example.com",
        password: "123456",
        userType: "buyer",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("user", mockUser);
      expect(res.body).toHaveProperty("token", "mockToken");
    });

    it("should not register if email already exists", async () => {
      getUserByEmail.mockResolvedValue({ email: "test@example.com" });

      const res = await request(app).post("/register").send({
        email: "test@example.com",
        password: "123456",
        userType: "buyer",
      });

      expect(res.statusCode).toBe(409);
      expect(res.body.message).toMatch(/Email already exists/);
    });

    it("should return 400 if required fields are missing", async () => {
      const res = await request(app).post("/register").send({});
      expect(res.statusCode).toBe(400);
    });
  });

  describe("POST /login", () => {
    it("should login user successfully", async () => {
      const mockUser = { userId: 1, email: "test@example.com", password: "hashed" };
      getUserByEmail.mockResolvedValue(mockUser);
      comparePWD.mockResolvedValue(true);
      UserToken.mockReturnValue("mockToken");

      const res = await request(app).post("/login").send({
        email: "test@example.com",
        password: "123456",
        userType: "buyer",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token", "mockToken");
    });

    it("should return 404 if user not found", async () => {
      getUserByEmail.mockResolvedValue(null);

      const res = await request(app).post("/login").send({
        email: "notfound@example.com",
        password: "123456",
        userType: "buyer",
      });

      expect(res.statusCode).toBe(404);
    });

    it("should return 401 if password does not match", async () => {
      getUserByEmail.mockResolvedValue({ email: "test@example.com", password: "hashed" });
      comparePWD.mockResolvedValue(false);

      const res = await request(app).post("/login").send({
        email: "test@example.com",
        password: "wrongpassword",
        userType: "buyer",
      });

      expect(res.statusCode).toBe(401);
    });
  });

  describe("POST /logout", () => {
    it("should log out user", async () => {
      const res = await request(app).post("/logout");
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch(/logged out/i);
    });
  });

  describe("GET /user/:id/:userType", () => {
    it("should return user by ID", async () => {
      getUserById.mockResolvedValue({ id: 1, email: "test@example.com" });

      const res = await request(app).get("/user/1/buyer");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("email");
    });

    it("should return 404 if user not found", async () => {
      getUserById.mockResolvedValue(null);

      const res = await request(app).get("/user/99/buyer");

      expect(res.statusCode).toBe(404);
    });
  });

  describe("GET /user/email/:email/:userType", () => {
    it("should return user by email", async () => {
      getUserByEmail.mockResolvedValue({ id: 1, email: "test@example.com" });

      const res = await request(app).get("/user/email/test@example.com/buyer");

      expect(res.statusCode).toBe(200);
    });

    it("should return 404 if user not found", async () => {
      getUserByEmail.mockResolvedValue(null);

      const res = await request(app).get("/user/email/missing@example.com/buyer");

      expect(res.statusCode).toBe(404);
    });
  });

  describe("PUT /user/:id/:userType", () => {
    it("should update a user", async () => {
      updateUser.mockResolvedValue({ id: 1, email: "updated@example.com" });

      const res = await request(app)
        .put("/user/1/buyer")
        .send({ email: "updated@example.com" });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch(/updated successfully/);
    });
  });

  describe("DELETE /user/:id/:userType", () => {
    it("should delete a user", async () => {
      deleteUser.mockResolvedValue(true);

      const res = await request(app).delete("/user/1/buyer");

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch(/deleted successfully/);
    });
  });
});
