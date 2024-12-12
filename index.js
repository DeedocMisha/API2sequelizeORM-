
const express = require('express');
const cors = require('cors');
const db = require('./db');

const PORT = process.env.PORT || 8000;
const app = express();

// Middleware для обработки CORS
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Middleware для обработки JSON
app.use(express.json());

// Импортируйте роутеры
const userRouter = require('./Routes/userRouter'); // Проверьте корректность путей

app.use('/api', userRouter);

const sequelize = db.sequelize;

// Убедитесь, что вы вызываете соединение с базой данных
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
