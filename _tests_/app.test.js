process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe("/jobs", () => {
  describe("GET", () => {
    test("status 200: responds with an array of job objects", () => {
      return request(app)
        .get("/api/jobs/")
        .expect(200)
        .then(({ body: { allJobs } }) => {
          expect(Array.isArray(allJobs)).toBe(true);
        });
    });
    test("status 200: each job object contains certain properties", () => {
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
    test("status 200: accepts an order by query that sorts the jobs by ascending order", () => {
      return request(app)
        .get("/api/jobs?order=asc")
        .expect(200)
        .then(({ body: { allJobs } }) => {
          expect(allJobs).toBeSortedBy("created_at", { ascending: true });
        });
    });
    test("status 200: accepts a skill_name query that filters the jobs by skill_name", () => {
      return request(app)
        .get("/api/jobs?skill_name=translating")
        .expect(200)
        .then(({ body: { allJobs } }) => {
          expect(allJobs).toHaveLength(1);
        });
    });
    test("status 200: accepts a location query that filters the jobs by location", () => {
      return request(app)
        .get("/api/jobs?location=M1")
        .expect(200)
        .then(({ body: { allJobs } }) => {
          expect(allJobs).toHaveLength(1);
        });
    });
    test("status 200: returns an empty array if skill name does not exist", () => {
      return request(app)
        .get("/api/jobs?skill_name=cat%20handling")
        .expect(200)
        .then(({ body: { allJobs } }) => {
          expect(allJobs).toHaveLength(0);
        });
    });
    test("status 200: returns an empty array if location does not exist", () => {
      return request(app)
        .get("/api/jobs?location=ZZ99")
        .expect(200)
        .then(({ body: { allJobs } }) => {
          expect(allJobs).toHaveLength(0);
        });
    });
    test("status 400: trying to sort jobs based on a non-existent column", () => {
      return request(app)
        .get("/api/jobs?sort_by=not_a_column")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("bad request");
        });
    });
    test("status 400: trying to order jobs by invalid order type", () => {
      return request(app)
        .get("/api/jobs?order=cats")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("bad request");
        });
    });
  });
  describe("unsupported methods", () => {
    test("status: 405 - responds with method not allowed", () => {
      const methods = ["post", "put", "delete", "patch"];

      const requestPromises = methods.map((method) => {
        return request(app)
          [method]("/api/jobs")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe("method not allowed");
          });
      });

      return Promise.all(requestPromises);
    });
  });
});

describe("/skills", () => {
  describe("GET", () => {
    test("status 200: responds with an array of skills objects", () => {
      return request(app)
        .get("/api/skills")
        .expect(200)
        .then(({ body: { allSkills } }) => {
          expect(Array.isArray(allSkills)).toBe(true);
        });
    });
    test("status 200: each skill object contains certain properties", () => {
      return request(app)
        .get("/api/skills")
        .expect(200)
        .then(({ body: { allSkills } }) => {
          allSkills.forEach((skill) => {
            expect(skill).toHaveProperty("skill_id");
            expect(skill).toHaveProperty("skill_name");
          });
        });
    });
    test("status 200: by default, sorts the skills by the skill_id column and in ascending order", () => {
      return request(app)
        .get("/api/skills")
        .expect(200)
        .then(({ body: { allSkills } }) => {
          expect(allSkills).toBeSortedBy("skill_id");
        });
    });
  });
  describe("unsupported methods", () => {
    test("status: 405 - responds with method not allowed", () => {
      const methods = ["post", "put", "delete", "patch"];

      const requestPromises = methods.map((method) => {
        return request(app)
          [method]("/api/skills")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe("method not allowed");
          });
      });

      return Promise.all(requestPromises);
    });
  });
});
