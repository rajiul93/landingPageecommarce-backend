import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import { connectDB } from "../app/database";
import { Category } from "../app/modules/category/category.model";
import { generateAdminToken, generateUserToken } from "../app/utils/fakeTokenForTest";

let adminToken: string;
let userToken: string;

beforeAll(async () => {
  await connectDB();

  // Generate tokens for admin and user roles
  adminToken = generateAdminToken();
  userToken = generateUserToken();
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

  it("should create category and respond with success and empty data array", async () => {
    const inputData = {
      title: testName,
      value: testName,
    };

    const res = await request(app)
      .post("/api/categories")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(inputData)
      .expect(201);

    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "Category created successfully");
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(0);
  }, 15000);

  describe("GET /api/categories", () => {

    it("should return all categories for admin user", async () => {
      // First create a category so we have data to fetch
      await Category.create({ title: "Mobile", value: "mobile" });

      const res = await request(app)
        .get("/api/categories")
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body).toHaveProperty("success", true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);

      if (res.body.data.length > 0) {
        expect(res.body.data[0]).toHaveProperty("_id");
        expect(res.body.data[0]).toHaveProperty("title");
        expect(res.body.data[0]).toHaveProperty("value");
      }
    });

    it("should return 401 if no token provided", async () => {
      const res = await request(app)
        .get("/api/categories")
        .expect(401);

      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("message", "Unauthorized: No token provided");
    });

    it("should return 403 if role is not admin", async () => {
      const res = await request(app)
        .get("/api/categories")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(403);

      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("message", "Forbidden: You do not have the required role");
    });

  });

describe("DELETE /api/categories/:id", () => {

  it("should delete category successfully", async () => {
    const category = await Category.create({ title: "Laptop", value: "laptop" });

    const res = await request(app)
      .delete(`/api/categories/${category._id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);

    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "Category delete successfully");
    expect(res.body.data).toHaveProperty("_id", category._id.toString());

    const check = await Category.findById(category._id);
    expect(check).toBeNull();
  });

  it("should return 400 for invalid category ID format", async () => {
    const res = await request(app)
      .delete("/api/categories/invalid-id")
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(400);

    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Invalid ID format");
  });

  it("should return 400 if category not found", async () => {
    const validId = new mongoose.Types.ObjectId().toString(); // valid but non-existing ID

    const res = await request(app)
      .delete(`/api/categories/${validId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(400);

    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Category not found");
  });

});
});
