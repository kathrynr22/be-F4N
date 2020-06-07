# be-F4N

# Favour4aNeighbour API

### Migrations

This is where you will set up the schema for each table in your database.

You should have separate tables for `skills`, `charities`, `jobs`, `users` and `comments`. You will need to think carefully about the order in which you create your migrations. You should think carefully about whether you require any constraints on your table columns (e.g. 'NOT NULL')

//Charity should come first, because users table and comments table needs to refer to it
Each charity should have:

- `charity_name` which is a unique string that acts as the table's primary key
- `charity_logo` not sure how this would work
- `charity_url`
- `charity_description` string limit characters

//Skill should come second as users table, jobs table and comments table need to refer to it

Each skill should have:

- `skill_name` field which is a unique string that acts as the table's primary key

//Username should come third as jobs reference usernames

Each user should have:

- `username` which is the primary key & unique - may not need this if we are signing in through facebook/google?
- `password` may not need mix of char and numbers
- `first_name` string limit on characters
- `last_name` string limit on characters
- `number` ?
- `email` ?
  //need some method of communicating with each other - they can communicate in comments section, but people would not want to give out their contact details on a comment. Would they be happy giving their email address and phone number on profile page..I guess so. Ideally we could implement some private chat functionality but not MVP.
- `avatar_url`
- `skill_name`
- `location` are we doing location eg Chorlton or Postcode eg M21 ??
- `bio` limit amount of characters
- `charity_id` which references the charity table
- `charity_name` which references the charity table
- `charity_logo` which references the charity table
- `justgiving_link` for demo purposes may have to do a fake charity link and not actually use justgiving...something silly like ju5tgiving

Each job should have:

- `job_id` which is the primary key
- `title` string limit characters
- `body` string limit characters
- `skills_required` not sure how to do this ???
- `username` field that references a user's primary key (username)
- `created_at` defaults to the current timestamp

//comments should come last as they reference job id, usernames, and charity info.

Each comment should have:

- `comment_id` which is the primary key
- `username` field that references a user's primary key (username)
- `job_id` field that references an job's primary key
- `charity_id` - ?? dont know if we need this as well as charity name would need a junction table needs to reference charity from user table
- `charity_name` needs to reference charity from user table
- `created_at` defaults to the current timestamp
- `body` string - limit characters

* **NOTE:** psql expects `Timestamp` types to be in a specific date format - **not a unix timestamp** as they are in our data! However, you can easily **re-format a unix timestamp into something compatible with our database using JS - you will be doing this in your utility function**... [JavaScript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

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
  - `skills_required`
  - `username`
  - `avatar_url`
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

- `sort_by`, which sorts the comments by charity or location (defaults to date)

```http
DELETE /api/jobs/:job_id
```

#### Should

- delete the given job by `job_id`

#### Responds with

- status 204 and no content

---
