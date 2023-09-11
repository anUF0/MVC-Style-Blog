const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Renders all posts at /dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ['id', 'title', 'content', 'date_created'],
      order: [['date_created', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment', 'post_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
      ],
    });
    const posts = postData.get({ plain: true });
    res.render('dashboard', { posts, loggedIn: true, name: req.session.name });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Gets one post to edit at dashboard/edit/:id
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'content', 'date_created'],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment', 'post_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
      ],
    });
    const posts = postData.get({ plain: true });
    res.render('edit-post', {
      posts,
      loggedIn: true,
      name: req.session.name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Gets new post at /dashboard/new
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', { name: req.session.name });
});

module.exports = router;
