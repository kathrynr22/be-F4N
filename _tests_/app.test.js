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
  describe("/:job_id", () => {
    describe("GET", () => {
      test("status 200: responds with a job object which contains certain properties", () => {
        return request(app)
          .get("/api/jobs/1")
          .expect(200)
          .then(({ body: { job } }) => {
            expect(job).toHaveProperty(
              "title",
              "Hair stylist for an important event"
            );
            expect(job).toHaveProperty(
              "body",
              "Hi all, it is my daughter's graduation next week and I would love to look my best. But none of the hairdressers are open. Would anyone be willing to come round and fix my hair. I would love to donate to a good cause at the same time!"
            );
            expect(job).toHaveProperty("skill_name", "hair styling");
            expect(job).toHaveProperty("username", "gdurdane");
            expect(job).toHaveProperty(
              "avatar_url",
              "https://randomuser.me/api/portraits/men/72.jpg"
            );
            expect(job).toHaveProperty("location", "M1");
            expect(job).toHaveProperty("job_id", 1);
            expect(job).toHaveProperty(
              "created_at",
              "2020-05-02T11:15:00.000Z"
            );
            expect(job).toHaveProperty("comment_count", "1");
          });
      });
      test("status 404: responds with job not found when job_id does not exist", () => {
        return request(app)
          .get("/api/jobs/999")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("job not found");
          });
      });
    });
    describe("unsupported methods", () => {
      test("status: 405 - responds with method not allowed", () => {
        const methods = ["post", "put", "delete", "patch"];

        const requestPromises = methods.map((method) => {
          return request(app)
            [method]("/api/jobs/1")
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).toBe("method not allowed");
            });
        });

        return Promise.all(requestPromises);
      });
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

  describe("users/:username", () => {
    describe("GET", () => {
      test("status 200: responds with the requested username object - user with only one skill", () => {
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
              skill_name: ["DIY"],
            });
          });
      });
      test("status 200: responds with the requested username object - user with more than one skill", () => {
        return request(app)
          .get("/api/users/twebleyf")
          .expect(200)
          .then(({ body: { userObject } }) => {
            expect(userObject).toEqual({
              username: "twebleyf",
              first_name: "Terrie",
              last_name: "Webley",
              email: "twebleyf@dmoz.org",
              avatar_url: "https://randomuser.me/api/portraits/women/39.jpg",
              location: "M2",
              bio:
                "Hi I am Terrie and I work in graphic design. I also speak and read fluent German if anyone needs a hand with that.",
              charity_name: "Greenpeace",
              charity_logo:
                "https://images.justgiving.com/image/greenpeace_logo2.gif?template=size200x200",
              skill_name: ["graphic design", "translating"],
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
  describe("/users", () => {
    describe("POST", () => {
      test("status 201: responds with a user object", () => {
        return request(app)
          .post("/api/users")
          .send({
            username: "madeupusername",
            first_name: "bill",
            last_name: "mcbilly",
            email: "fakeemail@hotmail.co.uk",
            avatar_url: "https://randomuser.me/api/portraits/men/84.jpg",
            location: "M21",
            bio: "hello, I am Bill.",
            charity_name: "Oxfam",
            skill_name: ["translating", "DIY"],
          })
          .expect(201)
          .then(({ body: { user } }) => {
            expect(user).toHaveProperty("username", "madeupusername");
            expect(user).toHaveProperty("first_name", "bill");
            expect(user).toHaveProperty("last_name", "mcbilly");
            expect(user).toHaveProperty("email", "fakeemail@hotmail.co.uk");
            expect(user).toHaveProperty(
              "avatar_url",
              "https://randomuser.me/api/portraits/men/84.jpg"
            );
            expect(user).toHaveProperty("location", "M21");
            expect(user).toHaveProperty("bio", "hello, I am Bill.");
            expect(user).toHaveProperty("charity_name", "Oxfam");
            expect(user).toHaveProperty("skill_name", ["translating", "DIY"]);
          });
      });
    });
  });
});
