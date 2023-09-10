const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Gets all comments at api/comments
router.get('/', async (req, res) => {
  try {
    const commentData = Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Adds comment at api/comments/:id
router.post('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      post_id: req.body.recId,
      body: req.body.commentText,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Deletes comment at api/comments/:id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
