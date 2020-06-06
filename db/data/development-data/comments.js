// - `comment_id` which is the primary key
// - `username` field that references a user's primary key (username)
// - `job_id` field that references an job's primary key
// - `created_at` defaults to the current timestamp
// - `body` string - limit characters

// username: "afawdry0",
//     username: "fvanlint1",
//     username: "ghanvey2",
//     username: "swhordley3",
//     username: "vrylett5",
//     username: "lwilliams7",
//     username: "ogreenhall8",
//     username: "mtiremana",
//     username: "csimmons22",
//     username: "sfantonec",
//     username: "jbugbirdy",
//     username: "stevesmith33",
//     username: "jackthelad",
//     username: "gcornelius17",
//     username: "okerley19",
//     username: "vkausche1a",
//     username: "egillie1b",
//     username: "salsina1c",
//     username: "mbouch1d",
//     username: "tsnowsill1h",
//     username: "ematkovic1j",
//     username: "cocurrigan1t",
//     username: "mfreeberne1u",
//     username: "dmacnish1v",
//     username: "sstraun1w",
//     username: "mneagle1x",
//     username: "kparnall1y",
//     username: "kheasly20",
//     username: "cpevie21",
//     username: "ebarkworth23",
//     username: "gsher2g",

module.exports = [
  {
    body:
      "Hi there, I am happy to pop round and take a look at your leaking tap. I am free anytime this weekend. Phone number and email in bio. Just get in touch!",
    job_id: "", //in nc news the data had a belongs_to which was title of article and then somehow with a util function it ended up being article id cant remember how it worked...
    username: "gsher2g",
    avatar_url: "tbc",
    charity_name: "",
    charity_id: "",
    charity_logo: "",
    created_at: "", //do we need to fill this in
  },
];
