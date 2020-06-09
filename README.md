# be-F4N

# Favour4aNeighbour API

### Migrations

This is where you will set up the schema for each table in your database.

You should have separate tables for `charities`, `skills`, `users` `jobs`, and `comments`.

//Charity should come first, because the users table and the comments table needs to refer to it

Each charity should have:

- `charity_name` which is a unique string that acts as the table's primary key
- `charity_logo`
- `charity_description` string limit characters.
- `justgiving_link` https://www.justgiving.com/oxfam

//Skill should come second as the users table, jobs table and comments table need to refer to it

Each skill should have:

- `skill_id` primary key
- `skill_name` string

//Users should come third as the jobs and comments tables reference usernames

Each user should have:

- `username` which is the primary key & unique
- `first_name` string limit on characters
- `last_name` string limit on characters
- `email` ?
  //they need some method of communicating with each other - they can communicate in comments section, but people would not want to give out their contact details on a comment. Would they be happy giving their email address and phone number on profile page..I guess so. Ideally we could implement some private chat functionality but not MVP.
- `avatar_url`
- `location` Postcode eg M21 ??
- `bio` limit amount of characters
- `charity_name` which references the charity table

users-skills junction table:

- `skill_id`
- `username`

Each job should have:

- `job_id` which is the primary key
- `title` string limit characters
- `body` string limit characters
- `location` eg M21
- `username` field that references a user's primary key (username)
- `created_at` defaults to the current timestamp

//comments should come last as they reference job id, usernames, and charity info.

Each comment should have:

- `comment_id` which is the primary key
- `username` field that references a user's primary key (username)
- `job_id` field that references an job's primary key
- `created_at` defaults to the current timestamp
- `body` string - limit characters

* **NOTE:** psql expects `Timestamp` types to be in a specific date format - **not a unix timestamp** as they are in our data! However, you can easily **re-format a unix timestamp into something compatible with our database using JS - you will be doing this in your utility function**... [JavaScript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

### Routes

```http
GET /api/ shows all end points etc - useful for developing front end

GET /api/skills - JO

GET /api/users/:username - KR
POST /api/users - KR

GET /api/jobs - DONE
POST /api/jobs - JO

GET /api/jobs/:job_id - JO
DELETE /api/jobs: job_id - JO

GET /api/jobs/:job_id/comments - KR
POST /api/jobs/:job_id/comments - KR

OTHER nice to haves - if time

DELETE /api/jobs/:job_id/comments
PATCH /api/users



```

---

### Route Requirements

_**All of your endpoints should send the below responses in an object, with a key name of what it is that being sent. E.g.**_

```json
{
  "user": [
    {
      "username": "fsokale34",
      "first_name": "Finn",
      "last_name": "Sokale",
      "email": "fsokale34@salon.com",
      "avatar_url": "tbc",
      "location": "M1",
      "bio": "Hello I am a graphic designer. Reach out if you need a favour and help me raise some funds for a charity in need. I am also great at DIY.",
      "charity_name": "tbc",
      "charity_logo": "tbc",
      "skill_name": "graphic design"
    }
  ]
}
```

GET /api/skills

#### Responds with

- an array of skill objects, each of which should have the following properties:
  - `skill_id`
  - `skill_name`

---

---

```http
GET /api/users/:username
```

#### Responds with

- a user object which should have the following properties:
  - `username`
  - `first_name`
  - `last_name`
  - `number`
  - `email`
  - `avatar_url`
  - `skills`
  - `location` tbc if eg Chorlton or M21
  - `bio`
- `charity_id`
- `charity_name`
- `charity_logo` from charity table
- `justgivingurl`

---

```http
GET /api/jobs
```

#### Responds with

- an `jobs` array of job objects, each of which should have the following properties:
  - `title`
  - `body`
  - `skill_name`
  - `username`
  - `avatar_url`
  - `location`
  - `job_id`
  - `created_at`
  - `comment_count` which is the total count of all the comments with this job_id - you should make use of knex queries in order to achieve this

#### Should accept queries

- `sort_by`, which sorts the jobs by location or skills (defaults to date)

- `order`, which sets the `sort_by` order (defaults to descending)

- `skill_name`, which filters the jobs by skill

- `location`, which filters the jobs by location

```http
POST /api/jobs/
```

On front end when posting user should be able to select certain skills from either a drop down or type and suggestions appear...in which case does GET /api/skills need to be linked in somehow

#### Request body accepts

- an object with the following properties:
  - `username`
  - `title`
  - `skills_required`
  - `body`
  - `location` tbc if eg Chorlton or M21

#### Responds with

- the posted job including job_id and created_at which would be added automatically (I think)

```http
GET /api/jobs/:job_id
```

#### Responds with

- an job object, which should have the following properties:

* `title`
* `job_id`
* `body`
* `skills_required`
* `username` from the users table
* `avatar_url`
* `location`
* `created_at`
* `comment_count` which is the total count of all the comments with this job_id - you should make use of knex queries in order to achieve this

---

```http
POST /api/jobs/:job_id/comments
```

#### Request body accepts

- an object with the following properties:
  - `username`
  - `body`

#### Responds with

- the posted comment including comment_id and created_at - can we also get it to display user location, user avatar_url and user charity name by default when they post a comment? Without them having to manually enter that into an input box.

---

```http
GET /api/jobs/:job_id/comments


```

#### Responds with

- an array of comments for the given `job_id` of which each comment should have the following properties:
  - `comment_id`
  - `created_at`
  - `username` front end would includes hyperlink that takes you to /api/users/:user_id
  - `avatar_url`
  - `location`
  - `charity_name` from charity table
  - `charity_id` not sure if we need this
  - `charity_logo` from charity table
  - `body`

#### Should accept queries

- filter which sorts the comments by charity or location (defaults to date)

```http
DELETE /api/jobs/:job_id
```

#### Should

- delete the given job by `job_id`

#### Responds with

- status 204 and no content

---
