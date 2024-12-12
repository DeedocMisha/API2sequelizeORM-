
require('dotenv').config(); //Подключение .env!

const Sequelize = require('sequelize');
/*,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  */
const sequelize = new Sequelize(`${process.env.DB_NAME}`,`${process.env.DB_USER}` , `${process.env.DB_PASSWORD}`, {
    host: 'localhost', // или ваш хост
    dialect: 'postgres',
});

const Person = require('./Person')(sequelize); // Предполагается, что файл вашей модели называется Person.js
const Post = require('./Post')(sequelize);

module.exports = {
    sequelize,//ПОДКЛ К БД
    Person,//ИНФ ПЕРСОНАЖ
    Post
};