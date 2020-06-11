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
    username: 'fvanlint1',
    job_id: 1, //Hedge trimming help
    created_at: '2020-06-08T10:53:00.000Z',
    body:
      'Hi there, I am free on Saturday afternoon if that suits. Weather looks good! I can bring my own hedge trimmers!',
  },
  {
    //comment_id added automatically by database
    username: 'okerley19',
    job_id: 1, //Hedge trimming help
    created_at: '2020-06-07T11:33:00.000Z',
    body: "Hiya happy to help. I'm free all weekend so just let me know.",
  },
  {
    //comment_id added automatically by database
    username: 'afawdry0',
    job_id: 1, //Hedge trimming help
    created_at: '2020-06-07T12:53:00.000Z',
    body:
      'Hi I am free this weekend so just let me know if that suits! I could bring an electric trimmer to speed things up.',
  },
  {
    //comment_id added automatically by database
    username: 'mbouch1d',
    job_id: 1, //Hedge trimming help
    created_at: '2020-06-05T13:53:00.000Z',
    body:
      "Howdy, definitely happy to help with that. I can do Sunday afternoon. It would be nice to get some fresh air and it's great excercise, not to mention raising money for a great cause! Just send me an email if you need a hand.",
  },
  {
    //comment_id added automatically by database
    username: 'ghanvey2',
    job_id: 2, //Tax return hell
    created_at: '2020-06-02T14:53:00.000Z',
    body:
      'Hi there, I am happy to come and take a look. Bit tied up with work until next weekend though.',
  },
  {
    //comment_id added automatically by database
    username: 'stevesmith33',
    job_id: 2, //Tax return hell
    created_at: '2020-06-03T16:11:00.000Z',
    body: 'Hello, I can pop round tomorrow evening if that suits.',
  },
  {
    //comment_id added automatically by database
    username: 'csimmons22',
    job_id: 3, //Flat pack fans?
    created_at: '2020-06-04T16:11:00.000Z',
    body:
      "I'm happy to help out to raise money for a brilliant charity. I have a spare couple of hours on Sunday afternoon.",
  },
  {
    //comment_id added automatically by database
    username: 'mbouch1d',
    job_id: 4, //Cleaning help please
    created_at: '2020-06-05T10:11:00.000Z',
    body:
      'Sorry to hear your Dad is in hospital. I am a professional cleaner and would be happy to help. I am free anytime Sunday if that works.',
  },
  {
    //comment_id added automatically by database
    username: 'jbugbirdy',
    job_id: 5, //Missing roof tile
    created_at: '2020-06-04T10:11:00.000Z',
    body:
      "As a professional roofer the storm has certianly kept me busy in recent days! However I do have a spare day on Friday. Happy to give some of my time to help you out in order to raise money for a charity that's very close to my heart. Just let me know if Friday works.",
  },
  {
    //comment_id added automatically by database
    username: 'kheasly20',
    job_id: 5, //Missing roof tile
    created_at: '2020-06-05T10:11:00.000Z',
    body:
      "Best getting it fixed in the next few days as it's due to rain heavily! I am free this Saturday if that works for you.",
  },
  {
    //comment_id added automatically by database
    username: 'gcornelius17',
    job_id: 6, //Anyone good at proofreading
    created_at: '2020-06-04T10:11:00.000Z',
    body:
      'Hi there, happy to give this a read over for you. It may take me a few days to get through it all as I can only work on it here and there. I am free the next few evenings if that would work. Would be good to raise some money for an important charity!',
  },
  {
    //comment_id added automatically by database
    username: 'egillie1b',
    job_id: 6, //Anyone good at proofreading
    created_at: '2020-06-05T13:11:00.000Z',
    body: 'Hiya, I could give it a once over this weekend. Just let me know!',
  },
  {
    //comment_id added automatically by database
    username: 'mtiremana',
    job_id: 7, //wallpaper bubbles
    created_at: '2020-06-06T13:11:00.000Z',
    body:
      'Wallpaper bubbles are the worst! I am a painter and decorator so I know the tricks of the trade. Happy to pop round tomorrow evening if that works.',
  },
  {
    //comment_id added automatically by database
    username: 'vrylett5',
    job_id: 8, //dripping tap
    created_at: '2020-06-05T13:11:00.000Z',
    body:
      "Hiya, I can get that fixed in two shakes of a lamb's tail. I am free anytime tomorrow so just shout and I'll pop over. Would be great to raise some money for a fab cause as well!",
  },
  {
    //comment_id added automatically by database
    username: 'lwilliams7',
    job_id: 9, //lightbulb
    created_at: '2020-06-05T14:11:00.000Z',
    body:
      "Nightmare! No bother mate. I can pop over and sort that in a jiffy. Let's raise some money for a great cause too.",
  },
  {
    //comment_id added automatically by database
    username: 'stevesmith33',
    job_id: 12, //Computer won't turn on
    created_at: '2020-06-08T14:53:00.000Z',
    body:
      'Hi there, sounds like it could be a battery issue. I am happy to come and take a look. I am free any evening this weekend.',
  },
  {
    //comment_id added automatically by database
    username: 'swhordley3',
    job_id: 12, //Computer won't turn on
    created_at: '2020-06-06T11:53:00.000Z',
    body:
      'Hi there, could be various reasons but should be easy enough to fix. I can come and take a look this weekend if that works! Would be great to lend a hand to a neighbour and raise some money for a fantastic charity!',
  },
  {
    //comment_id added automatically by database
    username: 'stevesmith33',
    job_id: 12, //Computer won't turn on
    created_at: '2020-06-05T11:53:00.000Z',
    body:
      'Hiya I had a similiar issue with my MacBook Air - I had to buy a new battery in the end! But I know a thing or two about MacBooks so I could come round and do some troubleshooting. Saturday afternoon works for me!',
  },
  {
    //comment_id added automatically by database
    username: 'tsnowsill1h',
    job_id: 12, //Computer won't turn on
    created_at: '2020-06-06T10:23:00.000Z',
    body:
      "Hello, I'm not an expert on Macs but I've seen similiar problems with PCs. If you wanted me to drop by I am free Sunday morning or Thursday evening this week. Just let me know, would be good to raise some money for a good cause.",
  },
  {
    //comment_id added automatically by database
    username: 'ematkovic1j',
    job_id: 12, //Computer won't turn on
    created_at: '2020-06-7T11:20:00.000Z',
    body:
      "Howdy - could be something as simple as a loose wire. I've fixed this problem myself a few times and I've got the right tools for the job too. I'm actually on annual leave all this week and free as a bird so just shout. It would be great to raise some money for a good cause and help a neighbour in need.",
  },
  {
    //comment_id added automatically by database
    username: 'cocurrigan1t',
    job_id: 12, //Computer won't turn on
    created_at: '2020-06-6T08:20:00.000Z',
    body:
      "Hi there - it shouldn't be the battery if it's only a few years old. Perhaps just a loose wire or something to do with power board. I am free Friday evening and then I am on holiday for two weeks, so just shout if Friday evening works for you - if not good luck!.",
  },
  {
    //comment_id added automatically by database
    username: 'mfreeberne1u',
    job_id: 12, //Computer won't turn on
    created_at: '2020-06-5T09:20:00.000Z',
    body:
      "Hello! I found this article that might be useful https://www.howtogeek.com/217158/what-to-do-when-your-mac-won%E2%80%99t-start-up/ if it still doesn't work then I can come and take a look at it any time tomorrow.",
  },
];
