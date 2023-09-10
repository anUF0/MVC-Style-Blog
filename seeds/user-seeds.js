const { User } = require('../models');

const userData = [
  {
    //1
    name: 'Michael',
    email: 'michael@hotmail.com',
    password: 'p4ssw0rd',
  },
  {
    //2
    name: 'Giselle',
    email: 'gissy@gmail.com',
    password: 'password',
  },
  {
    //3
    name: 'Mandy',
    email: 'lord@gmail.com',
    password: 'pa55word',
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
