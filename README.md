# be-F4N

# Favour4aNeighbour API

### Migrations

This is where you will set up the schema for each table in your database.

You should have separate tables for `skills`, `charities`, `jobs`, `users` and `comments`. You will need to think carefully about the order in which you create your migrations. You should think carefully about whether you require any constraints on your table columns (e.g. 'NOT NULL')

Each user should have:

- `username` which is the primary key & unique - may not need this if we are signing in through facebook/google?
- `first_name` string limit on characters
- `last_name` string limit on characters
- `phone number` ?
- `email` ?
  //need some method of communicating with each other - they can communicate in comments section, but people would not want to give out their contact details on a comment. Would they be happy giving their email address and phone number on profile page..I guess so. Ideally we could implement some private chat functionality but not MVP.
- `avatar_url`
- `skills` how can we allow for more than one skill?
- `location` are we doing location eg Chorlton or Postcode eg M21 ??
- `bio` limit amount of characters
- `charity_id` which references the charity table
- `charity_logo` which references the charity table
- `justgiving_link` for demo purposes may have to do a fake charity link and not actually use justgiving...something silly like ju5tgiving

Each job should have:

- `job_id` which is the primary key
- `title` string limit characters
- `body` string limit characters
- `skills_required` not sure how to do this ???
- `author` field that references a user's primary key (username)
- `created_at` defaults to the current timestamp

Each comment should have:

- `comment_id` which is the primary key
- `author` field that references a user's primary key (username)
- `job_id` field that references an job's primary key
- `created_at` defaults to the current timestamp
- `body` string - limit characters

Each charity should have:

- `charity_id` which is the primary key
- `charity_name` field that references a user's primary key (username)
- `charity_logo` not sure how this would work
- `charity_url`
- `charity_description` string limit characters

Each skill should have:

- `skill_id` which is the primary key
- `skill_name` string limt on characters

- **NOTE:** psql expects `Timestamp` types to be in a specific date format - **not a unix timestamp** as they are in our data! However, you can easily **re-format a unix timestamp into something compatible with our database using JS - you will be doing this in your utility function**... [JavaScript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

### Routes

```http
GET /api/

GET /api/skills

GET /api/users/:username
POST /api/users

GET /api/jobs
POST /api/jobs

GET /api/jobs/:job_id
DELETE /api/jobs: job_id

GET /api/jobs/:job_id/comments
POST /api/jobs/:job_id/comments

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
      "username": "JoeBlogs99",
      "avatar_url": "some url?",
      "name": "Joe Blogs",
      "location": "Chorlton" OR "M21"
      "skills": {"skill1": "gardening", "skill2" :"plumbing"},
      "chosen_charity": "Oxfam",
      "charity_id": 430 (may not need this),
      "charity_logo": "some url?"

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
  - `avatar_url`
  - `name` dunno if we need name and username
  - `location` tbc if eg Chorlton or M21
  - `bio`
  - `skills`
  - `chosen_charity` which is charity_name from charity table
  - `charity_id` not sure if we need this as well
- `charity_logo` from charity table

---

```http
GET /api/jobs
```

#### Responds with

- an `jobs` array of job objects, each of which should have the following properties:
  - `username`
  - `name` not sure if needed
  - `title`
  - `skills_required`
  - `location` tbc if eg Chorlton or M21
  - `job_id`
  - `created_at`
  - `comment_count` which is the total count of all the comments with this job_id - you should make use of knex queries in order to achieve this

#### Should accept queries

- `sort_by`, which sorts the jobs by location or skills (defaults to date)

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

  - `author` which is the `username` from the users table
  - `title`
  - `job_id`
  - `body`
  - `skills_required`
  - `created_at`
  - `comment_count` which is the total count of all the comments with this job_id - you should make use of knex queries in order to achieve this

---

```http
POST /api/jobs/:job_id/comments
```

#### Request body accepts

- an object with the following properties:
  - `username`
  - `body`

#### Responds with

- the posted comment including comment_id and created_at - can we also get it to display user location, user avatar_url and user charity by default when they post a comment? Without them having to manually enter that into an input box.

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
  - `chosen_charity` from charity table
  - `charity_id` not sure if we need this
  - `charity_logo` from charity table
  - `body`

#### Should accept queries

- `sort_by`, which sorts the comments by charity or location (defaults to date)

```http
DELETE /api/jobs/:job_id
```

#### Should

- delete the given job by `job_id`

#### Responds with

- status 204 and no content

---
