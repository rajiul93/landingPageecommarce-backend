import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import { connectDB } from "../app/database";
import { Category } from "../app/modules/category/category.model";
import { generateAdminToken } from "../app/utils/fakeTokenForTest";

let adminToken: string;
let userToken: string;

beforeAll(async () => {
  await connectDB();

  // Generate tokens for admin and user roles
  adminToken = generateAdminToken(); 
});

beforeEach(async () => {
  // Clear categories collection before each test
  await Category.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Category API", () => {
 const testName = `test-category-${Date.now()}`.toLowerCase();

  it("should create brand and respond with success and empty data array", async () => {
    const inputData = {
      title: testName,
      value: testName,
    };

    const res = await request(app)
      .post("/api/brand")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(inputData)
      .expect(201);

    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "Brand created successfully");
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(0);
  }, 15000);



 
});
