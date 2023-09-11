const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

//Renders login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/api/user-profile');
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

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
