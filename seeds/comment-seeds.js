const { Commments } = require('../models');

const commentData = [
  {
    //1
    content: 'Wow',
    date_created: '2023-02-03',
    user_id: 3,
    post_id: 1,
  },
  {
    //2
    content: 'Nice',
    date_created: '2023-09-03',
    user_id: 1,
    post_id: 2,
  },
  {
    //3
    content: 'Very Interesting',
    date_created: '2023-10-05',
    user_id: 2,
    post_id: 3,
  },
];

const seedComments = () => Commments.bulkCreate(commentData);

module.exports = seedComments;
