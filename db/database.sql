CREATE DATABASE learncoding;

CREATE TABLE users (_id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);
CREATE TABLE category (_id SERIAL PRIMARY KEY, categoryName TEXT NOT NULL);
CREATE TABLE video (_id TEXT PRIMARY KEY, title TEXT NOT NULL, thumbnail TEXT, category_id INTEGER REFERENCES category(_id));
CREATE TABLE history (user_id INTEGER REFERENCES users(_id), video_id TEXT REFERENCES video(_id));
-- CREATE TABLE watchlater
-- CREATE TABLE like
-- CREATE TABLE playlist


INSERT INTO category VALUES ('javascript concepts'), ('promise in javascript'), ('react hooks'), ('react router'), ('css'), ('html');
INSERT INTO video (_id, title, thumbnail, category_id) 
VALUES ('lluVvNFLx5k', 'promise in JavaScript (basics) - part 1', 'promise in javascript/Promise_in_JavaScript_jo1tb3', 2), 
('AvHIlRFENJs', 'async and defer in script tag in HTML', 'javascript concepts/async_and_defer_a6x7d4', 1);

-- why the _id in video table is of TEXT type => because see when I insert values, I have to provide the id myself as every youtube video had a different id to identify it.