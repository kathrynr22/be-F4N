process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe('/jobs', () => {
  describe('GET', () => {
    test('status 200: responds with an array of job objects', () => {
      return request(app)
        .get('/api/jobs/')
        .expect(200)
        .then(({ body: { jobs } }) => {
          expect(Array.isArray(jobs)).toBe(true);
        });
    });
    test('status 200: each job object contains certain properties', () => {
      return request(app)
        .get('/api/jobs')
        .expect(200)
        .then(({ body: { jobs } }) => {
          jobs.forEach(job => {
            expect(job).toHaveProperty('title');
            expect(job).toHaveProperty('body');
            expect(job).toHaveProperty('skill_name');
            expect(job).toHaveProperty('username');
            expect(job).toHaveProperty('avatar_url');
            expect(job).toHaveProperty('location');
            expect(job).toHaveProperty('job_id');
            expect(job).toHaveProperty('created_at');
            expect(job).toHaveProperty('comment_count');
            expect(job).toHaveProperty('job_status');
          });
        });
    });
    test('status 200: by default, sorts the jobs by the created_at column and in descending order', () => {
      return request(app)
        .get('/api/jobs')
        .expect(200)
        .then(({ body: { jobs } }) => {
          expect(jobs).toBeSortedBy('created_at', {
            descending: true,
          });
        });
    });
    test('status 200: accepts an order by query that sorts the jobs by ascending order', () => {
      return request(app)
        .get('/api/jobs?order=asc')
        .expect(200)
        .then(({ body: { jobs } }) => {
          expect(jobs).toBeSortedBy('created_at', { ascending: true });
        });
    });
    test('status 200: accepts an order by query that sorts the jobs by descending order', () => {
      return request(app)
        .get('/api/jobs?order=desc')
        .expect(200)
        .then(({ body: { jobs } }) => {
          expect(jobs).toBeSortedBy('created_at', { descending: true });
        });
    });
    test('status 200: accepts a skill_name query that filters the jobs by skill_name', () => {
      return request(app)
        .get('/api/jobs?skill_name=translating')
        .expect(200)
        .then(({ body: { jobs } }) => {
          expect(jobs).toHaveLength(1);
        });
    });
    test('status 200: accepts a location query that filters the jobs by location', () => {
      return request(app)
        .get('/api/jobs?location=M1')
        .expect(200)
        .then(({ body: { jobs } }) => {
          expect(jobs).toHaveLength(2);
        });
    });
    test('status 200: accepts a username query that filters the jobs by username', () => {
      return request(app)
        .get('/api/jobs?username=dfoxl')
        .expect(200)
        .then(({ body: { jobs } }) => {
          expect(jobs).toHaveLength(2);
        });
    });

    test('status 404: responds with path not found when filtering jobs by non-existent skill_name', () => {
      return request(app)
        .get('/api/jobs?skill_name=cat%20handling')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('path not found');
        });
    });
    test('status 404: responds with path not found when filtering jobs by non-existent location', () => {
      return request(app)
        .get('/api/jobs?location=ZZ99')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('path not found');
        });
    });
    test('status 404: responds with username not found when filtering jobs by non-existent username', () => {
      return request(app)
        .get('/api/jobs?username=kathryn')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('path not found');
        });
    });
    test('status 400: trying to sort jobs based on a non-existent column', () => {
      return request(app)
        .get('/api/jobs?sort_by=not_a_column')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
    test('status 400: trying to order jobs by invalid order type', () => {
      return request(app)
        .get('/api/jobs?order=cats')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
  });
  describe('POST', () => {
    test('status 201: responds with a job object', () => {
      return request(app)
        .post('/api/jobs')
        .send({
          username: 'gdurdane',
          title: 'Test Job',
          body: 'Test job for testing purposes',
          skill_name: 'graphic design',
          location: 'M2',
        })
        .expect(201)
        .then(({ body: { job } }) => {
          console.log(job);
          expect(job).toHaveProperty('title', 'Test Job');
          expect(job).toHaveProperty('body', 'Test job for testing purposes');
          expect(job).toHaveProperty('skill_name', 'graphic design');
          expect(job).toHaveProperty('username', 'gdurdane');
          expect(job).toHaveProperty(
            'avatar_url',
            'https://randomuser.me/api/portraits/men/72.jpg'
          );
          expect(job).toHaveProperty('location', 'M2');
          expect(job).toHaveProperty('job_id');
          expect(job).toHaveProperty('created_at');
          expect(job).toHaveProperty('comment_count');
          expect(job).toHaveProperty('job_status', 'created');
        });
    });
    test('status 201: responds with a job_id', () => {
      return request(app)
        .post('/api/jobs')
        .send({
          username: 'gdurdane',
          title: 'Test Job',
          body: 'Test job for testing purposes',
          skill_name: 'graphic design',
          location: 'M1',
        })
        .expect(201)
        .then(({ body: { job } }) => {
          expect(job).toHaveProperty('job_id', 7);
        });
    });
    test('status 201: responds with a comment_count defaulted to 0', () => {
      return request(app)
        .post('/api/jobs')
        .send({
          username: 'gdurdane',
          title: 'Test Job',
          body: 'Test job for testing purposes',
          skill_name: 'graphic design',
          location: 'M1',
        })
        .expect(201)
        .then(({ body: { job } }) => {
          expect(job).toHaveProperty('comment_count', '0');
        });
    });
    test('status 201: responds with a created_at not set to null', () => {
      return request(app)
        .post('/api/jobs')
        .send({
          username: 'gdurdane',
          title: 'Test Job',
          body: 'Test job for testing purposes',
          skill_name: 'graphic design',
          location: 'M1',
        })
        .expect(201)
        .then(({ body: { job } }) => {
          expect(job.created_at).toBeTruthy;
        });
    });
    test('status 400: responds with bad request when passed body without username', () => {
      return request(app)
        .post('/api/jobs')
        .send({
          username: 'gdurdane',
          title: 'Test Job',
          body: 'Test job for testing purposes',
          missing_skill_name: 'not a skill',
          location: 'M1',
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
    test('status 400: responds with bad request when passed invalid location', () => {
      return request(app)
        .post('/api/jobs')
        .send({
          username: 'gdurdane',
          title: 'Test Job',
          body: 'Test job for testing purposes',
          skill_name: 'translating',
          not_a_location: 'M1',
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
    test('status 404: responds with username not found when posting a job with non-existent username', () => {
      return request(app)
        .post('/api/jobs')
        .send({
          username: 'dontexist',
          title: 'Test Job',
          body: 'Test job for testing purposes',
          skill_name: 'graphic design',
          location: 'M1',
        })
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('username not found');
        });
    });
    test('status 404: responds with skill not found when posting a job with non-existent skill', () => {
      return request(app)
        .post('/api/jobs')
        .send({
          username: 'gdurdane',
          title: 'Test Job',
          body: 'Test job for testing purposes',
          skill_name: 'not a skill',
          location: 'M1',
        })
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('skill not found');
        });
    });
  });
  describe('unsupported methods', () => {
    test('status: 405 - responds with method not allowed', () => {
      const methods = ['put', 'delete', 'patch'];

      const requestPromises = methods.map(method => {
        return request(app)
          [method]('/api/jobs')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe('method not allowed');
          });
      });

      return Promise.all(requestPromises);
    });
  });
  describe('/:job_id', () => {
    describe('GET', () => {
      test('status 200: responds with a job object which contains certain properties', () => {
        return request(app)
          .get('/api/jobs/1')
          .expect(200)
          .then(({ body: { job } }) => {
            expect(job).toHaveProperty(
              'title',
              'Hair stylist for an important event'
            );
            expect(job).toHaveProperty(
              'body',
              "Hi all, it is my daughter's graduation next week and I would love to look my best. But none of the hairdressers are open. Would anyone be willing to come round and fix my hair. I would love to donate to a good cause at the same time!"
            );
            expect(job).toHaveProperty('skill_name', 'hair styling');
            expect(job).toHaveProperty('username', 'gdurdane');
            expect(job).toHaveProperty(
              'avatar_url',
              'https://randomuser.me/api/portraits/men/72.jpg'
            );
            expect(job).toHaveProperty('location', 'M1');
            expect(job).toHaveProperty('job_id', 1);
            expect(job).toHaveProperty(
              'created_at',
              '2020-05-02T11:15:00.000Z'
            );
            expect(job).toHaveProperty('comment_count', '1');
            expect(job).toHaveProperty('job_status', 'created');
          });
      });
      test('status 400: responds with bad request when job_id is invalid', () => {
        return request(app)
          .get('/api/jobs/cats')
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('bad request');
          });
      });
      test('status 404: responds with job not found when job_id does not exist', () => {
        return request(app)
          .get('/api/jobs/999')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('job not found');
          });
      });
    });
    describe('DELETE', () => {
      test('status 204: responds with no context on successful delete ', () => {
        return request(app).del('/api/jobs/1').expect(204);
      });
      test('status 400: responds with bad request when job_id is invalid', () => {
        return request(app)
          .delete('/api/jobs/cats')
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('bad request');
          });
      });
      test('status 404: responds with job not found when job_id does not exist', () => {
        return request(app)
          .del('/api/jobs/999')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('job not found');
          });
      });
    });
    // describe('PATCH', () => {
    //   test.only('status 200: responds with the job status updated to accepted', () => {
    //     return request(app)
    //       .patch('/api/jobs/1')
    //       .send({ job_status: 'accepted' })
    //       .expect(200)
    //       .then(({ body: { job } }) => {
    //         expect(job.job_status).toEqual('accepted');
    //       });
    //   });

    // test("status 404: trying to patch a non-existent article_id", () => {
    //   return request(app)
    //     .patch("/api/articles/76666666")
    //     .send({ inc_votes: 1 })
    //     .expect(404)
    //     .then(({ body: { msg } }) => {
    //       expect(msg).toBe("article_id not found");
    //     });
    // });
    // test("status 400: trying to patch to an invalid article_id", () => {
    //   return request(app)
    //     .patch("/api/articles/notAnInt")
    //     .send({ inc_votes: 1 })
    //     .expect(400)
    //     .then(({ body: { msg } }) => {
    //       expect(msg).toBe("bad request");
    //     });
    // });
    // test("status 400: trying to patch something invalid ie not incrementing or decrementing a vote", () => {
    //   return request(app)
    //     .patch("/api/articles/1")
    //     .send({ inc_votes: "notAnInt" })
    //     .expect(400)
    //     .then(({ body: { msg } }) => {
    //       expect(msg).toBe("bad request");
    //     });
    // });
    // });

    describe('unsupported methods', () => {
      test('status: 405 - responds with method not allowed', () => {
        const methods = ['post', 'put'];

        const requestPromises = methods.map(method => {
          return request(app)
            [method]('/api/jobs/1')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).toBe('method not allowed');
            });
        });

        return Promise.all(requestPromises);
      });
    });
  });
});

describe('/skills', () => {
  describe('GET', () => {
    test('status 200: responds with an array of skills objects', () => {
      return request(app)
        .get('/api/skills')
        .expect(200)
        .then(({ body: { skills } }) => {
          expect(Array.isArray(skills)).toBe(true);
        });
    });
    test('status 200: each skill object contains certain properties', () => {
      return request(app)
        .get('/api/skills')
        .expect(200)
        .then(({ body: { skills } }) => {
          skills.forEach(skill => {
            expect(skill).toHaveProperty('skill_id');
            expect(skill).toHaveProperty('skill_name');
          });
        });
    });
    test('status 200: by default, sorts the skills by the skill_id column and in ascending order', () => {
      return request(app)
        .get('/api/skills')
        .expect(200)
        .then(({ body: { skills } }) => {
          expect(skills).toBeSortedBy('skill_id');
        });
    });
  });
  describe('unsupported methods', () => {
    test('status: 405 - responds with method not allowed', () => {
      const methods = ['post', 'put', 'delete', 'patch'];

      const requestPromises = methods.map(method => {
        return request(app)
          [method]('/api/skills')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe('method not allowed');
          });
      });

      return Promise.all(requestPromises);
    });
  });
});

describe('/users', () => {
  test('status 405: invalid methods', () => {
    const invalidMethods = ['patch', 'delete'];
    const requests = invalidMethods.map(method => {
      return request(app)
        [method]('/api/users/gdurdane')
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('method not allowed');
        });
    });
    return Promise.all(requests);
  });
  describe('GET', () => {
    test('status 200: responds with an array of users', () => {
      return request(app)
        .get('/api/users/')
        .expect(200)
        .then(({ body: { users } }) => {
          expect(Array.isArray(users)).toBe(true);
        });
    });
    test('status: 200 - responds with array of user objects', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(({ body: { users } }) => {
          users.forEach(user => {
            console.log('yo');
            console.log(user);
            expect(user).toHaveProperty('username');
            expect(user).toHaveProperty('first_name');
            expect(user).toHaveProperty('last_name');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('avatar_url');
            expect(user).toHaveProperty('location');
            expect(user).toHaveProperty('bio');
            expect(user).toHaveProperty('charity_name');
          });
        });
    });
  });
  describe('POST', () => {
    test('status 201: responds with a user object', () => {
      return request(app)
        .post('/api/users')
        .send({
          username: 'madeupusername',
          first_name: 'bill',
          last_name: 'mcbilly',
          email: 'fakeemail@hotmail.co.uk',
          avatar_url: 'https://randomuser.me/api/portraits/men/84.jpg',
          location: 'M21',
          bio: 'hello, I am Bill.',
          charity_name: 'Oxfam',
          skill_name: ['translating', 'DIY'],
        })
        .expect(201)
        .then(({ body: { user } }) => {
          expect(user).toHaveProperty('username', 'madeupusername');
          expect(user).toHaveProperty('first_name', 'bill');
          expect(user).toHaveProperty('last_name', 'mcbilly');
          expect(user).toHaveProperty('email', 'fakeemail@hotmail.co.uk');
          expect(user).toHaveProperty(
            'avatar_url',
            'https://randomuser.me/api/portraits/men/84.jpg'
          );
          expect(user).toHaveProperty('location', 'M21');
          expect(user).toHaveProperty('bio', 'hello, I am Bill.');
          expect(user).toHaveProperty(
            'charity_logo',
            'https://images.justgiving.com/image/ebc6a2ca-1c7f-4aa5-9e1a-bfb982397bc4.jpg?template=size200x200'
          );
          expect(user).toHaveProperty('charity_name', 'Oxfam');
          expect(user).toHaveProperty('skill_name', ['translating', 'DIY']);
        });
    });
    test('status 400: responds with bad request when passed invalid body', () => {
      return request(app)
        .post('/api/users')
        .send({
          username: 'madeupusername',
          first_name: 'bill',
          last_name: 'mcbilly',
          email: 'fakeemail@hotmail.co.uk',
          avatar_url: 'https://randomuser.me/api/portraits/men/84.jpg',
          location: 'M21',
          bio: 'hello, I am Bill.',
          charity_name: 'Oxfam',
          missing_skill_name: 'not a skill',
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
    test('status 404: responds with skill not found when posting a user with non-existent skill', () => {
      return request(app)
        .post('/api/users')
        .send({
          username: 'madeupusername',
          first_name: 'bill',
          last_name: 'mcbilly',
          email: 'fakeemail@hotmail.co.uk',
          avatar_url: 'https://randomuser.me/api/portraits/men/84.jpg',
          location: 'M21',
          bio: 'hello, I am Bill.',
          charity_name: 'Oxfam',
          skill_name: ['not a skill'],
        })
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('skill not found');
        });
    });
  });
});
describe('users/:username', () => {
  describe('GET', () => {
    test('status 200: responds with the requested username object - user with only one skill', () => {
      return request(app)
        .get('/api/users/gdurdane')
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).toEqual({
            username: 'gdurdane',
            first_name: 'Godfrey',
            last_name: 'Durdan',
            email: 'gdurdane@drupal.org',
            avatar_url: 'https://randomuser.me/api/portraits/men/72.jpg',
            location: 'M1',
            bio: "Hello I'm Godfrey and I work at B&Q and love all things DIY!",
            charity_name: 'Oxfam',
            charity_logo:
              'https://images.justgiving.com/image/ebc6a2ca-1c7f-4aa5-9e1a-bfb982397bc4.jpg?template=size200x200',
            skill_name: ['DIY'],
          });
        });
    });
    test('status 200: responds with the requested username object - user with more than one skill', () => {
      return request(app)
        .get('/api/users/twebleyf')
        .expect(200)
        .then(({ body: { user } }) => {
          console.log(user);
          expect(user).toEqual({
            username: 'twebleyf',
            first_name: 'Terrie',
            last_name: 'Webley',
            email: 'twebleyf@dmoz.org',
            avatar_url: 'https://randomuser.me/api/portraits/women/39.jpg',
            location: 'M2',
            bio:
              'Hi I am Terrie and I work in graphic design. I also speak and read fluent German if anyone needs a hand with that.',
            charity_name: 'Greenpeace',
            charity_logo:
              'https://images.justgiving.com/image/greenpeace_logo2.gif?template=size200x200',
            skill_name: ['graphic design', 'translating'],
          });
        });
    });
    test('status 404: non-existent username', () => {
      return request(app)
        .get('/api/users/kathryn')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('username not found');
        });
    });
  });
});
describe('/:job_id/comments', () => {
  describe('GET', () => {
    test('status 200: responds with an array of comment objects', () => {
      return request(app)
        .get('/api/jobs/1/comments')
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(Array.isArray(comments)).toBe(true);
        });
    });

    test('status 200: comment object contains certain properties', () => {
      return request(app)
        .get('/api/jobs/1/comments')
        .expect(200)
        .then(({ body: { comments } }) => {
          comments.forEach(comment => {
            expect(comment).toHaveProperty('comment_id');
            expect(comment).toHaveProperty('username');
            expect(comment).toHaveProperty('created_at');
            expect(comment).toHaveProperty('body');
            expect(comment).toHaveProperty('location');
            expect(comment).toHaveProperty('charity_name');
            expect(comment).toHaveProperty('job_id');
            expect(comment).toHaveProperty('avatar_url');
          });
        });
    });

    test('status 200: responds with empty array when an job exists but has no comments', () => {
      return request(app)
        .get('/api/jobs/6/comments')
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(Array.isArray(comments)).toBe(true);
          expect(comments.length).toBe(0);
          expect(comments).toEqual([]);
        });
    });
    test('status 200: accepts a location query that filters comments by location', () => {
      return request(app)
        .get('/api/jobs/1/comments?location=M6')
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).toHaveLength(1);
          expect(comments[0].location).toBe('M6');
        });
    });
    test('status 200: accepts a charity query that filters comments by charity name', () => {
      return request(app)
        .get('/api/jobs/5/comments?charity_name=RSPCA')
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).toHaveLength(1);
          expect(comments[0].charity_name).toBe('RSPCA');
        });
    });

    test('status 404: trying to get comments for a non-existent job_id', () => {
      return request(app)
        .get('/api/jobs/76655/comments')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('job_id not found');
        });
    });
    test('status 400: trying to get comments for an invalid job_id not a number', () => {
      return request(app)
        .get('/api/jobs/notAnInt/comments')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
    test('status 200: by default, sorts the comments by the created_at column and by descending order', () => {
      return request(app)
        .get('/api/jobs/5/comments')
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).toBeSortedBy('created_at', {
            descending: true,
          });
        });
    });

    test('status 200: accepts an order by query that orders the comments by descending order', () => {
      return request(app)
        .get('/api/jobs/5/comments?order=desc')
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).toBeSortedBy('created_at', {
            descending: true,
          });
        });
    });
    test('status 200: accepts an order by query that orders the comments by ascending order', () => {
      return request(app)
        .get('/api/jobs/5/comments?order=asc')
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).toBeSortedBy('created_at', {
            ascending: true,
          });
        });
    });

    test('status 404: trying to order comments for a non-existent job_id', () => {
      return request(app)
        .get('/api/jobs/76666666/comments?order=desc')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('job_id not found');
        });
    });
    test('status 400: trying to order comments for an invalid job_id', () => {
      return request(app)
        .get('/api/jobs/notAnInt/comments?order=desc')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
    test('status 400: trying to order articles by an invalid method', () => {
      return request(app)
        .get('/api/jobs/1/comments?order=disc')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
  });
  describe('POST', () => {
    test('status 201: responds with a comment object', () => {
      return request(app)
        .post('/api/jobs/1/comments')
        .send({
          username: 'hstrowan2m',
          body:
            "Congratulations to your daughter on graduating. I'm free on friday evenings",
        })
        .expect(201)
        .then(({ body: { comment } }) => {
          expect(comment).toHaveProperty('comment_id', 9);
          expect(comment).toHaveProperty('username', 'hstrowan2m');
          expect(comment).toHaveProperty('job_id', 1);
          expect(comment).toHaveProperty('created_at');
          expect(comment).toHaveProperty(
            'body',
            "Congratulations to your daughter on graduating. I'm free on friday evenings"
          );
          expect(comment).toHaveProperty('location', 'M6');
          expect(comment).toHaveProperty('charity_name', 'Oxfam');
          expect(comment).toHaveProperty(
            'charity_logo',
            'https://images.justgiving.com/image/ebc6a2ca-1c7f-4aa5-9e1a-bfb982397bc4.jpg?template=size200x200'
          );
          expect(comment).toHaveProperty(
            'avatar_url',
            'https://randomuser.me/api/portraits/men/25.jpg'
          );
        });
    });
    test('status 400: responds with bad request when passed no username', () => {
      return request(app)
        .post('/api/jobs/1/comments')
        .send({
          body:
            "Congratulations to your daughter on graduating. I'm free on friday evenings",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
    test('status 400: responds with bad request when passed no body', () => {
      return request(app)
        .post('/api/jobs/1/comments')
        .send({
          username: 'hstrowan2m',
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
    test('status 400: responds with bad request when passed a string instead of integer', () => {
      return request(app)
        .post('/api/jobs/notainteger/comments')
        .send({
          username: 'hstrowan2m',
          body:
            "Congratulations to your daughter on graduating. I'm free on friday evenings",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
    test('status 400: responds with bad request when passed an non existent username', () => {
      return request(app)
        .post('/api/jobs/1/comments')
        .send({
          username: 'not a user name',
          body:
            "Congratulations to your daughter on graduating. I'm free on friday evenings",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
    test('status 400: responds with bad request when endpoint job_id is not existent', () => {
      return request(app)
        .post('/api/jobs/999/comments')
        .send({
          username: 'hstrowan2m',
          body:
            "Congratulations to your daughter on graduating. I'm free on friday evenings",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
  });
});
describe('/comments', () => {
  describe('GET', () => {
    test('status 200: accepts a username query that filters comments by username', () => {
      return request(app)
        .get('/api/comments?username=dfoxl')
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).toHaveLength(1);
          expect(comments[0].username).toBe('dfoxl');
        });
    });
    // test('status 200: responds with empty array when an username exists but has no comments', () => {
    //   return request(app)
    //     .get('/api/comments?username=gdurdane')
    //     .expect(200)
    //     .then(({ body: { comments } }) => {
    //       expect(Array.isArray(comments)).toBe(true);
    //       expect(comments.length).toBe(0);
    //       expect(comments).toEqual([]);
    //     });
    // });
    test('status 404: responds with username not found when filtering comments by nonexistent username', () => {
      return request(app)
        .get('/api/comments?username=kathryn')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('comments not found');
        });
    });
  });
});
describe('/charities', () => {
  test('status 200: responds with an array of charities objects', () => {
    return request(app)
      .get('/api/charities')
      .expect(200)
      .then(({ body: { charities } }) => {
        console.log('inside test');
        console.log(charities);
        expect(Array.isArray(charities)).toBe(true);
      });
  });
  test('status 200: each charity object contains certain properties', () => {
    return request(app)
      .get('/api/charities')
      .expect(200)
      .then(({ body: { charities } }) => {
        charities.forEach(charity => {
          expect(charity).toHaveProperty('charity_name');
          expect(charity).toHaveProperty('charity_logo');
          expect(charity).toHaveProperty('charity_description');
          expect(charity).toHaveProperty('justgiving_link');
        });
      });
  });
  test('status 200: by default, sorts the charities by the charity_name column and in ascending order', () => {
    return request(app)
      .get('/api/charities')
      .expect(200)
      .then(({ body: { charities } }) => {
        expect(charities).toBeSortedBy('charity_name', { ascending: true });
      });
  });
});
