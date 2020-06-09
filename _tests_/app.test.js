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
    test("status 200: each job article object contains certain properties", () => {
      return request(app)
        .get("/api/jobs")
        .expect(200)
        .then(({ body: { allJobs } }) => {
          allJobs.forEach((job) => {
            expect(job).toHaveProperty("title");
            expect(job).toHaveProperty("body");
            expect(job).toHaveProperty("skill_name");
            expect(job).toHaveProperty("username");
            expect(job).toHaveProperty("avatar_url");
            expect(job).toHaveProperty("location");
            expect(job).toHaveProperty("job_id");
            expect(job).toHaveProperty("created_at");
            expect(job).toHaveProperty("comment_count");
          });
        });
    });
    test("status 200: by default, sorts the jobs by the created_at column and in descending order", () => {
      return request(app)
        .get("/api/jobs")
        .expect(200)
        .then(({ body: { allJobs } }) => {
          expect(allJobs).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    test("status 200: accepts an order by query that sorts the articles by ascending order", () => {
      return request(app)
        .get("/api/jobs?order=asc")
        .expect(200)
        .then(({ body: { allJobs } }) => {
          expect(allJobs).toBeSortedBy("created_at", { ascending: true });
        });
    });
  });
});
