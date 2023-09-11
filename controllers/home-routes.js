const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//Renders login page at /login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

//Renders signup page at /signup
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('sign-up');
});

//Renders Homepage with all posts
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll();
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('post', {
      userData,
      posts,
      logged_in: req.session.logged_in,
      login: true,
    });

    res.render('homepage', { posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Renders single Post at /post/:id
router.get('./post/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const users = userData.map((user) => user.get({ plain: true }));
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

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('selected-post', {
      users,
      posts,
      logged_in: req.session.logged_in,
      login: true,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
