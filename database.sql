
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255)  -- Изменил тип на VARCHAR
);

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id) ON DELETE CASCADE  -- Опционально: добавил ON DELETE CASCADE
);
