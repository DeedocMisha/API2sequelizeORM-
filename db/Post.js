
const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define("Post", {
        id: {
            type: Sequelize.INTEGER, // Int
            primaryKey: true, // Pk
            autoIncrement: true // Автоинкремент для id
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false // поле не может быть пустым
        },
        content: {
            type: Sequelize.STRING(255),
            allowNull: false // поле не может быть пустым
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Person', // Имя модели, к которой ссылаемся   FOREIGN KEY!!!!!!
                key: 'id' // Поле в модели Person
            },
        },
    }, {
        timestamps: false,  // Исправлено: должно быть "timestamps".
        tableName: 'post'
    });
}
