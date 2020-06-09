process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe("/jobs", () => {
  describe("GET", () => {
    test("status 200: responds with an articles array of job objects", () => {
      return request(app)
        .get("/api/jobs/")
        .expect(200)
        .then(({ body: { allJobs } }) => {
          expect(Array.isArray(allJobs)).toBe(true);
        });
    });
  });
});
