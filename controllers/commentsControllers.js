const { selectCommentsByUsername } = require('../models/commentsModels');

exports.getCommentsByUsername = (req, res, next) => {
  const { username } = req.query;
  selectCommentsByUsername(username)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => {
      next(err);
    });
};
