const { Post } = require('../models');

const postData = [
  {
    //1
    title: 'AI Shimp Goes Live!',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo ullamcorper a lacus vestibulum sed arcu non odio. Felis eget nunc lobortis mattis.',
    date_created: '2023-01-23',
    user_id: 1,
  },
  {
    //2
    title: 'Voice Controlled Web Cam Review',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate.',
    date_created: '2023-09-10',
    user_id: 2,
  },
  {
    //3
    title: 'Piano-style Keyword',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis convallis convallis tellus id interdum velit.',
    date_created: '2023-04-10',
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
