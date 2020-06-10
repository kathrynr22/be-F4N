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
  describe("POST", () => {
    test("status 201: responds with a job object", () => {
      return request(app)
        .post("/api/jobs")
        .send({
          username: "gdurdane",
          title: "Test Job",
          body: "Test job for testing purposes",
          skill_name: "graphic design",
        })
        .expect(201)
        .then(({ body: { job } }) => {
          expect(job).toHaveProperty("title", "Test Job");
          expect(job).toHaveProperty("body", "Test job for testing purposes");
          expect(job).toHaveProperty("skill_name", "graphic design");
          expect(job).toHaveProperty("username", "gdurdane");
          expect(job).toHaveProperty(
            "avatar_url",
            "https://randomuser.me/api/portraits/men/72.jpg"
          );
          expect(job).toHaveProperty("location", "M1");
          expect(job).toHaveProperty("job_id");
          expect(job).toHaveProperty("created_at");
          expect(job).toHaveProperty("comment_count");
        });
    });
    test("status 201: responds with a job_id", () => {
      return request(app)
        .post("/api/jobs")
        .send({
          username: "gdurdane",
          title: "Test Job",
          body: "Test job for testing purposes",
          skill_name: "graphic design",
        })
        .expect(201)
        .then(({ body: { job } }) => {
          expect(job).toHaveProperty("job_id", 6);
        });
    });
    test("status 201: responds with a comment_count defaulted to 0", () => {
      return request(app)
        .post("/api/jobs")
        .send({
          username: "gdurdane",
          title: "Test Job",
          body: "Test job for testing purposes",
          skill_name: "graphic design",
        })
        .expect(201)
        .then(({ body: { job } }) => {
          expect(job).toHaveProperty("comment_count", "0");
        });
    });
    test("status 201: responds with a created_at not set to null", () => {
      return request(app)
        .post("/api/jobs")
        .send({
          username: "gdurdane",
          title: "Test Job",
          body: "Test job for testing purposes",
          skill_name: "graphic design",
        })
        .expect(201)
        .then(({ body: { job } }) => {
          expect(job.created_at).toBeTruthy;
        });
    });
    test("status 400: responds with bad request when passed invalid body", () => {
      return request(app)
        .post("/api/jobs")
        .send({
          username: "gdurdane",
          title: "Test Job",
          body: "Test job for testing purposes",
          missing_skill_name: "not a skill",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("bad request");
        });
    });
  });
  test("status 404: responds with username not found when posting a job with non-existent username", () => {
    return request(app)
      .post("/api/jobs")
      .send({
        username: "dontexist",
        title: "Test Job",
        body: "Test job for testing purposes",
        skill_name: "graphic design",
      })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("username not found");
      });
  });
  test("status 404: responds with skill not found when posting a job with non-existent skill", () => {
    return request(app)
      .post("/api/jobs")
      .send({
        username: "gdurdane",
        title: "Test Job",
        body: "Test job for testing purposes",
        skill_name: "not a skill",
      })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("skill not found");
      });
  });
  describe("unsupported methods", () => {
    test("status: 405 - responds with method not allowed", () => {
      const methods = ["put", "delete", "patch"];

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

describe("/users", () => {
  // test("status 405: invalid methods", () => {
  //   const invalidMethods = ["patch", "delete"];
  //   const requests = invalidMethods.map((method) => {
  //     return request(app)
  //       [method]("/api/users/lurker")
  //       .expect(405)
  //       .then(({ body: { msg } }) => {
  //         expect(msg).toBe("method not allowed");
  //       });
  //   });
  //   return Promise.all(requests);
  // });

  describe("/:username", () => {
    describe("GET", () => {
      test("status 200: responds with the requested username object", () => {
        return request(app)
          .get("/api/users/gdurdane")
          .expect(200)
          .then(({ body: { userObject } }) => {
            expect(userObject).toEqual({
              username: "gdurdane",
              first_name: "Godfrey",
              last_name: "Durdan",
              email: "gdurdane@drupal.org",
              avatar_url: "https://randomuser.me/api/portraits/men/72.jpg",
              location: "M1",
              bio:
                "Hello I'm Godfrey and I work at B&Q and love all things DIY!",
              charity_name: "Oxfam",
              charity_logo:
                "https://images.justgiving.com/image/ebc6a2ca-1c7f-4aa5-9e1a-bfb982397bc4.jpg?template=size200x200",
              skill_name: "DIY",
            });
          });
      });
      test("status 404: non-existent username", () => {
        return request(app)
          .get("/api/users/kathryn")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("username not found");
          });
      });
    });
  });
});
