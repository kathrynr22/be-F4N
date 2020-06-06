// - `job_id` which is the primary key
//   - `title` string limit characters
//     - `body` string limit characters
//       - `skills_required` not sure how to do this ???
//         - `author` field that references a user's primary key (username)
//           - `created_at` defaults to the current timestamp

//               username:
//                 username: "aduncklee32",

module.exports = [
  {
    title: "Gardening assistance required please!",
    body:
      "Hi all, I've been really busy with work and my garden has got out of control. Would anyone be willing to help me out for a few hours and I'll happily donate to your chosen charity!",
    skills_required: "gardening",
    username: "gdurdane",
    avatar_url: "tbc",
    location: "tbc",
    created_at: "", //do i put anything in here or does it create something by default,
  },
  {
    title: "Any accountants willing to help?",
    body:
      "Hi all, I am putting together my first tax return and I'm a little lost. Would anyone with the relevant skills have an hour to spare to help me?",
    skills_required: "accountancy",
    username: "twebleyf",
    avatar_url: "tbc",
    location: "tbc",
    created_at: "", //do i put anything in here or does it create something by default,
  },
  {
    title: "Flat pack experts neeeded",
    body:
      "Hi all, I have just moved house and went a bit made in Ikea. Would anyone have any spare time to lend a hand?",
    skills_required: "furniture-assembly",
    username: "jhumbell",
    avatar_url: "tbc",
    location: "tbc",
    created_at: "", //do i put anything in here or does it create something by default,
  },
  {
    title: "Cleaning assistance needed",
    body:
      "Hi guys, I have been visiting my mum in hospital the past few weeks and the cleaning has really got on top of me. I would so appreciate some help with that if possible.",
    skills_required: "cleaning",
    username: "cmarchbankj",
    avatar_url: "tbc",
    location: "tbc",
    created_at: "", //do i put anything in here or does it create something by default,
  },
  {
    title: "Missing roof tile!",
    body:
      "Hi all I noticed a tile had fallen off my roof. Would be very grateful if someone could take a look.",
    skills_required: "roofer",
    username: "dfoxl",
    avatar_url: "tbc",
    location: "tbc",
    created_at: "", //do i put anything in here or does it create something by default,
  },
  {
    title: "Anyone able to help with a proofreading job?",
    body:
      "Hi all I have finally written the first draft of my phd. It would be brilliant if someone could proofread the first draft. Charitable donation given in exchange!",
    skills_required: "proofreading",
    username: "hstrowan2m",
    avatar_url: "tbc",
    location: "tbc",
    created_at: "", //do i put anything in here or does it create something by default,
  },
  {
    title: "Wallpapering is driving me mad!",
    body:
      "Hey guys, if anyone is free to help me with some wallpapering, I would be eternally grateful!",
    skills_required: "painting and decorating",
    username: "wstallebrass2r",
    avatar_url: "tbc",
    location: "tbc",
    created_at: "", //do i put anything in here or does it create something by default,
  },
  {
    title: "Dripping tap - help!",
    body:
      "Hi there, I've got a dripping tap if anyone has the tools to fix it!",
    skills_required: "plumbing",
    username: "fsokale34",
    avatar_url: "tbc",
    location: "tbc",
    created_at: "", //do i put anything in here or does it create something by default,
  },
  {
    title: "Lightbulb needs changing",
    body:
      "Hi all, I need a lightbulb changing but I have done my back in recently and can't do it. Can anyone help!",
    skills_required: "electrician",
    username: "cgibberd2x",
    avatar_url: "tbc",
    location: "tbc",
    created_at: "", //do i put anything in here or does it create something by default,
  },
  {
    title: "Computer issues",
    body:
      "Hi guys, I think I've got a virus on my computer. The screen has gone red and is not responding, would anyone be able to give their opinion?",
    skills_required: "IT advice",
    username: "wstallebrass2r",
    avatar_url: "tbc",
    location: "tbc",
    created_at: "", //do i put anything in here or does it create something by default,
  },
];
