const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../util/auth.js');

//Get all posts at api/posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User, Comment],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Gets a single Post at api/posts/:id
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [User, Comment],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(404).json(err);
  }
});

//Posts to api/posts
router.post('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      body: req.body.postText,
      user_id: req.session.user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Updates post at api/posts/id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        body: req.body.postText,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json(postData);
  } catch (err) {
    res.status(404).json(err);
  }
});

//Delets post at api/posts/id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
