import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../src/app.js";

describe("BugLab API", () => {
  it("uses 200 for health checks", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("uses 404 for missing routes", async () => {
    const response = await request(app).get("/api/does-not-exist");
    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe("NOT_FOUND");
  });

  it("validates required attempt fields", async () => {
    const response = await request(app).post("/api/bugs/attempts").send({});
    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });
});
