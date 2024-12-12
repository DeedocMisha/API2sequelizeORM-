
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken'); // Не забудьте добавить эту строку для jwt
const router = express.Router();
const db = require('../db');
const Person = db.Person; // Получаем модель Person

// Вход пользователей
router.post('/user/LogIn', async (req, res) => {
    const { name, password } = req.body;
    try {
        // Поиск пользователя в базе данных
        const user = await Person.findOne({ where: { name } });
        const secretKey = process.env.JWT_SECRET_KEY; // Объявление jwt токена

        if (user) {
            // Проверка пароля
            const match = await bcrypt.compare(password, user.password); // Конвертация хэша пароля
            if (match) {
                // Успешный вход

                const crypto = require('crypto');

                const secretKey = crypto.randomBytes(32).toString('hex'); // Генерация 32-байтового ключа
                console.log(secretKey); // Выводите его в консоль или сохраните в переменной окружения

                const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' }); // Используйте user.id вместо user._id
                res.status(200).json({ message: 'Вход выполнен успешно', token, user: { name: user.name } });
            } else {
                // Неверный пароль
                res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
            }
        } else {
            // Неверное имя пользователя или пароль
            res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
        }
    } catch (error) {
        // Обработка ошибок
        console.error('Ошибка при входе:', error);
        res.status(500).json({ message: 'Ошибка сервера. Пожалуйста, повторите попытку позже.' });
    }
});

// Создаем маршрут для регистрации пользователей
router.post('/user', async (req, res) => {
    const { name, password } = req.body;
    try {
        // Проверка уникальности имени пользователя
        const existingUser = await Person.findOne({ where: { name } });
        if (existingUser) {
            return res.status(400).json({ message: 'Имя пользователя занято.' });
        }

        // Хэширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Person.create({ name, password: hashedPassword });
        res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: { name: newUser.name } }); // Отправляем ответ с созданным пользователем
    } catch (error) {
        console.error('Невозможно добавить пользователя:', error);
        res.status(500).json({ message: 'Ошибка при создании пользователя' });
    }
});

module.exports = router;
