CREATE DATABASE learncoding;

CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);
CREATE TABLE category (id SERIAL PRIMARY KEY, categoryName TEXT NOT NULL);
CREATE TABLE videos (id SERIAL PRIMARY KEY, title TEXT NOT NULL, thumbnail TEXT, category INTEGER REFERENCES category(id));
CREATE TABLE history (user_id INTEGER REFERENCES users(id), video_id INTEGER REFERENCES videos(id));
-- CREATE TABLE watchlater
-- CREATE TABLE like
-- CREATE TABLE playlist

INSERT INTO videos (title, thumbnail, category) 
VALUES ('promise in JavaScript (basics) - part 1', 'promise in javascript/Promise_in_JavaScript_jo1tb3', 2), 
('async and defer in script tag in HTML', 'javascript concepts/async_and_defer_a6x7d4', 1)