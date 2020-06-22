# F4N Favour 4 a Neighbour Backend Project

**Introduction**

F4N is a mobile application that is designed to make it easy for communities to help each other with tasks, whilst also raising money for charity.

All users of the app have a specific charity registered to their account.

A user who requires assistance with a job will write a post to a jobs page which will include a description of the job, location, skills required and a picture, if necessary. When posting a job, a user should also pledge an amount that they will donate to the chosen charity of whoever they choose to do the job for them.

Other users can then post comments underneath the job, expressing their willingness to help and can also press a button which alerts the job-poster. The person who posted the job will then receive a notification of offers of help and can then select whoever they want to help.

The project has been built using the following:

- Express: a web application framework for Node.js.
- PostgreSQL: an open source relational database
- Knex: an SQL query builder for relational databases
- Jest: a testing framework
- Jest Sorted: which makes it easier to test if an array has been correctly sorted.
- Supertest: for testing HTTP assertions
- Firebase: To allow us to build authentication into the app.

The project is supplied with a test and a development database.

The API has been hosted on Heroku and can be found here: https://f4n.herokuapp.com/api

**Front-End**

The hosted version of the front-end project: tbc
The repository for the front-end project: tbc

## Getting Started

### **Installation**

1. Fork and clone this repository

`git clone https://github.com/kathrynr22/be-F4N`

2. cd into the repository

`cd be-F4N`

3. install the dependencies

`npm install`

4. Set up and seed the databases

`npm run create-db`

`npm run seed-dev`

### Running the tests

We have followed TDD (Test Driven Development) best practice when building this application and it is built on the basis of RESTful endpoints.

To test the API:

`npm test app`

## What endpoints are being tested?

- `GET /api/skills` - Serves an array of user's skills.
- `GET /api/users` - Serves an array of users.
- `POST /api/users` - Responds with a new user object.
- `GET /api/users/:username` - Responds with a user object for a specified username.
- `PATCH /api/users/:username` - Allows users to patch their avatar_url and also allows for their total amount raised to be altered.
- `GET /api/users/:username/notifications` - Serves an array of notification objects.
- `POST /api/users/:username/notifications` - Serves an object for the posted notification.
- `PATCH /api/users/:username/notifications/:notification_id` - Patches the status of a notification object.
- `GET /api/jobs` Serves an array of all jobs.
- `POST /api/jobs` - Serves an object for the posted job.
- `GET /api/jobs/:job_id` - Serves a job object for the specified job_id.
- `PATCH /api/jobs/:job_id` - Allows for a job_status and job_image to be altered.
- `DELETE /api/jobs/:job_id` - Deletes the given job by job id.
- `GET /api/jobs/:job_id/helpers` - Serves up an array of helper objects for a particular job_id.
- `POST /api/jobs/:job_id/helpers` - Serves a helper object for the posted helper.
- `PATCH /api/jobs/:job_id/helpers` - Patches the job_status of a helper object.
- `POST /api/jobs/:job_id/comments` - Sserves an object of the posted comment for the specified job_id.
- `GET /api/jobs/:job_id/comments` - Serves an array of comments for the specified article_id.
- `GET /api/comments?username` - Serves an array of comments for the specified username.
- `GET /api/charities` - Serves an array of all charities.

The tests cover both "happy path" scenarios as well as various "unhappy path" scenarios.

**Team F4N**

- Kathryn Roberts https://github.com/kathrynr22
- James Oliver https://github.com/J-R-Oliver
- Rob Sidebotham https://github.com/robsidebotham
- Seb Smith https://github.com/Sewb21
