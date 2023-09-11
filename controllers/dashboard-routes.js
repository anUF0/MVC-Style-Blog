//Renders personal dashboard with Users posts
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//Renders dashboard at /dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await Post.findAll(req.session.user_id, {
      order: [['date_created', 'DESC']],
    });
    const dashboard = userData.get({ plain: true });
    res.render('dashboard', dashboard, { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Renders editing page at /dashboard/edit/id
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render('edit-post', post);
  } catch (err) {
    res.status(404).json(err);
  }
});

//Renders new post page at /dashboard/new
router.get('/new', withAuth, (req, res) => {
  try {
    res.render('new-post', { name: req.session.name });
  } catch (err) {
    res.status(500).json(err);
  }
});
