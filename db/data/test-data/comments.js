// - `comment_id` which is the primary key
// - `username` field that references a user's primary key (username)
// - `job_id` field that references an job's primary key
// - `charity_name` needs to reference charity name from user table ie what the person commenting/volunteering's chosen charity is
// - `created_at` defaults to the current timestamp
// - `body` string - limit characters

// username: "gdurdane",

//     username: "jhumbell",
//     username: "",
//     username: ",
//     username: "hstrowan2m",
//     username: "",
//     username: "cgibberd2x",
//     username: "aduncklee32",
//     username: "fsokale34",

// In NC news we posted a comment with just username and body it returned the whole comment inc author, article_id, votes, created_at

// title: "Hair stylist for an important party",

//     title: ",

//     title: "Window cleaner needed",

//     title: "",

//     title: "",

module.exports = [
  {
    body:
      "Hi there, I am a graphic designer and live nearby. I'm free Thursday evening next week, happy to come and give you some ideas then. I'm looking to raise money for X.",
    belongs_to: "Any graphic designers free next week?", //not sure if we need this that is how we did in nc news - some how belongs_to ended up being article_id in nc news.
    username: "twebleyf",
    avatar_url: "tbc",
    charity_name: "",
    charity_logo: "",
    created_at: "", //do we need to fill this in
    // how does it work with comments table how much info needs to be in the table and how much comes from a join?
  },
  {
    body:
      "Guten Tag! I speak German and this sounds like a really interesting project. I am free next weekend, any time.",
    belongs_to: "Any German speakers?", //not sure if we need this that is how we did in nc news - some how belongs_to ended up being article_id in nc news.
    username: "dfoxl",
    avatar_url: "tbc",
    charity_name: "",
    charity_logo: "",
    created_at: "", //do we need to fill this in
    // how does it work with comments table how much info needs to be in the table and how much comes from a join?
  },
  {
    body:
      "Hi I am happy to come and take a look. Saturday morning suits me. Would be great to raise some money for X!",
    belongs_to: "Car battery gone", //not sure if we need this that is how we did in nc news - some how belongs_to ended up being article_id in nc news.
    username: "cmarchbankj",
    avatar_url: "tbc",
    charity_name: "",
    charity_logo: "",
    created_at: "", //do we need to fill this in
    // how does it work with comments table how much info needs to be in the table and how much comes from a join?
  },
  {
    body:
      "Hi there, I am free any morning before 10am next week if that would suit you, just let me know!",
    belongs_to: "Window cleaner needed", //not sure if we need this that is how we did in nc news - some how belongs_to ended up being article_id in nc news.
    username: "wstallebrass2r",
    avatar_url: "tbc",
    charity_name: "",
    charity_logo: "",
    created_at: "", //do we need to fill this in
    // how does it work with comments table how much info needs to be in the table and how much comes from a join?
  },
];
