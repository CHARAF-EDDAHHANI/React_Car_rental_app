// tests/orderController.test.js
import request from "supertest";
import express from "express";
import { createOrderController } from "../controllers/orderController.js";

// Mock the orderModel
jest.mock("../models/orderModel.js", () => ({
  createOrder: jest.fn(),
}));

import { createOrder } from "../models/orderModel.js";

const app = express();
app.use(express.json());
app.post("/createOrder", createOrderController);

describe("POST /createOrder", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new order when valid data is provided", async () => {
    const mockOrderData = { carId: 1, userId: 2, amount: 500 };
    const mockCreatedOrder = { id: 123, ...mockOrderData };

    createOrder.mockResolvedValue(mockCreatedOrder);

    const res = await request(app)
      .post("/createOrder")
      .send(mockOrderData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      message: "Order created successfully",
      order: mockCreatedOrder,
    });
    expect(createOrder).toHaveBeenCalledWith(mockOrderData);
  });

  it("should log and handle missing orderData", async () => {
    const res = await request(app).post("/createOrder").send({});

    // Since your controller only logs for missing orderData but still calls createOrder,
    // we need to check that it fails gracefully.
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toContain("Server Error");
  });

  it("should return 500 if createOrder throws an error", async () => {
    const mockOrderData = { carId: 1, userId: 2, amount: 500 };
    createOrder.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .post("/createOrder")
      .send(mockOrderData);

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("error", "DB error");
  });
});
