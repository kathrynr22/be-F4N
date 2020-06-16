const { selectCommentsByUsername } = require('../models/commentsModels');

exports.getCommentsByUsername = (req, res, next) => {
  console.log('hello?');
  const { username } = req.query;
  console.log(username);
  selectCommentsByUsername(username)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => {
      next(err);
    });
};
