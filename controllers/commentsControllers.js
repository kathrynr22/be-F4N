const { selectCommentsByUsername } = require('../models/commentsModels');

exports.getCommentsByUsername = (req, res, next) => {
  console.log('hello?');
  const { username } = req.query;
  console.log(username);
  selectCommentsByUsername(username)
    .then(comments => {
      console.log('inside controllers');
      console.log(comments);
      res.status(200).send({ comments });
    })
    .catch(err => {
      console.log('inside catch');
      console.log(err);
      next(err);
    });
};
