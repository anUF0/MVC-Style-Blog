const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//Renders login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/api/dashboard');
    return;
  }
  res.render('login');
});

//Renders signup page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

//Renders Homepage with all posts
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const posts = postData.get({ plain: true });
    res.render('posts', {
      userData,
      posts,
      logged_in: req.session.logged_in,
      login: true,
    });

    res.render('homepage', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Renders single Post
router.get('./post/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: {
            model: User,
          },
        },
      ],
    });
    const posts = postData.get({ plain: true });
    res.render('posts', {
      userData,
      posts,
      logged_in: req.session.logged_in,
      login: true,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
