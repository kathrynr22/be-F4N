// - `comment_id` which is the primary key
// - `username` field that references a user's primary key (username)
// - `job_id` field that references an job's primary key
// - `charity_name` needs to reference charity name from user table ie what the person commenting/volunteering's chosen charity is
// - `created_at` defaults to the current timestamp
// - `body` string - limit characters

// username: "afawdry0",
//     username: "fvanlint1", gardening, photography
//     username: "ghanvey2", - accountant
//     username: "swhordley3", computers, photography
//     username: "vrylett5", - plumbing
//     username: "lwilliams7", - electrics
//     username: "ogreenhall8", - painting and decorating
//     username: "mtiremana", - painting and decorating, baking
//     username: "csimmons22", - flatpack
//     username: "sfantonec", - flatpack, photography
//     username: "jbugbirdy", - roofing
//     username: "stevesmith33", accounts, computers
//     username: "jackthelad", - plumbing
//     username: "gcornelius17", gardening, secretarial, typing, proofreading
//     username: "okerley19", - gardening
//     username: "vkausche1a", - plumbing, flatpack
//     username: "egillie1b", - proofreading, typing, baking
//     username: "salsina1c", - secretarial, typing
//     username: "mbouch1d", - cleaning, gardening
//     username: "tsnowsill1h", - computers
//     username: "ematkovic1j", - computers, gardening
//     username: "cocurrigan1t", computers, flat pack, photography
//     username: "mfreeberne1u", computers
//     username: "dmacnish1v", - accounts
//     username: "sstraun1w", - electrics
//     username: "mneagle1x", - electrics
//     username: "kparnall1y", painting decorating sewing baking
//     username: "kheasly20", roofing
//     username: "cpevie21", roofing
//     username: "ebarkworth23", cleaning make up artist
//     username: "gsher2g", plumbing
// username: afawdry0 - gardening, baking

module.exports = [
  {
    //comment_id added automatically by database
    username: "fvanlint1",
    job_id: 1, //Hedge trimming help
    created_at: "2020-06-08T10:53:00.000Z",
    body:
      "Hi there, I am free on Saturday afternoon if that suits. Weather looks good! I can bring my own hedge trimmers!",
  },
  {
    //comment_id added automatically by database
    username: "afawdry0",
    job_id: 1, //Hedge trimming help
    created_at: "2020-06-07T12:53:00.000Z",
    body:
      "Hi I am free this weekend so just let me know if that suits! I could bring an electric trimmer to speed things up.",
  },
  {
    //comment_id added automatically by database
    username: "mbouch1d",
    job_id: 1, //Hedge trimming help
    created_at: "2020-06-05T13:53:00.000Z",
    body:
      "Howdy, definitely happy to help with that. I can do Sunday afternoon. It would be nice to get some fresh air and it's great excercise. I'm raising money for Oxfam. Just send me an email if you need a hand.",
  },
  {
    //comment_id added automatically by database
    username: "ghanvey2",
    job_id: 2, //Tax return hell
    created_at: "2020-06-02T14:53:00.000Z",
    body:
      "Hi there, I am happy to come and take a look. Bit tied up with work until next weekend though.",
  },
  {
    //comment_id added automatically by database
    username: "stevesmith33",
    job_id: 2, //Tax return hell
    created_at: "2020-06-03T16:11:00.000Z",
    body:
      "Hello, I can pop round tomorrow evening if that suits. I am raising money for Cancer Research.",
  },
  {
    //comment_id added automatically by database
    username: "stevesmith33",
    job_id: 2, //Computer says no
    created_at: "2020-06-02T14:53:00.000Z",
    body:
      "Hello, I can pop round tomorrow evening if that suits. I am raising money for Cancer Research.",
  },
];
