
const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define("Person", {
        id: {
            type: Sequelize.INTEGER, // Int
            primaryKey: true, // Pk
            autoIncrement: true // Автоинкремент для id
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false // поле не может быть пустым
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false // поле не может быть пустым
        }
    }, {
        timestamps: false,  // Исправлено: должно быть "timestamps".
        tableName: 'person'
        
    });
    
}
